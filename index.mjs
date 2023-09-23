/*
    umpm - Universal Package Manager
*/
import fs from "fs";
//import * as path from "https://deno.land/std@0.201.0/path/mod.ts";
//import * as fs from "https://deno.land/std@0.201.0/fs/mod.ts";
//import { existsSync, ensureDirSync } from "https://deno.land/std@0.200.0/fs/mod.ts";

//import * as esbuild from "https://deno.land/x/esbuild@v0.19.2/mod.js";
//import { denoPlugins } from "./plugins/esbuild_deno_loader/mod.ts";
//import pluginVue from "https://esm.sh/esbuild-plugin-vue-next";

//import { brightGreen } from "https://deno.land/std@0.200.0/fmt/colors.ts";
//import { green, red, yellow } from "https://deno.land/std@0.140.0/fmt/colors.ts";
//import { join } from "https://deno.land/std@0.201.0/path/join.ts";

console.log('unpm - Universal(modules) node package manager, alternative to npm');

async function fetchUnpkgUmd(name, version = 'latest') {
    const tags = ['latest'];
    const versionOrLatest = version && tags.indexOf(version) == -1? [version, ...tags]: tags; // final
    const umdOrDist = ['umd/', 'dist/', ''];
    const nameOrIndex = [name, 'index'];
    const productionMin = ['.production.min', '.min', ''];
    const jsOrMjsOrCjs = ['js', 'mjs'];

    const formats = [];

    const import_map_url = `https://raw.githubusercontent.com/scriptmaster/unpm/main/unpm.import_map.json`;

    const import_map_res = await fetch(import_map_url);
    const text = await import_map_res.text();
    fs.writeFileSync('import_map.json', text, {encoding: 'utf8'})
    const import_map = await import_map_res.json();

    console.log(import_map.imports);

    const unpmGithubUrl = `https://raw.githubusercontent.com/scriptmaster/unpm/main/node_modules/@unpm/`;
    // `https://raw.githubusercontent.com/scriptmaster/unpm/main/node_modules/@unpm/${name}@{versionOrLatest}/umd/.js`;
    const cdns = ['https://unpkg.com', 'https://cdn.jsdelivr.net/npm/', 'https://esm.run/', 'https://esm.sh' unpmGithubUrl];
    const mapper = (map1, map2, g1 = '', g2 = '') => map1.reduce((p, m1) => [...p, ...map2.map(m2 => `${m1}${g1}${m2}${g2}`)], []);
    // console.log('reducer:', cdns.reduce((p, m) => [...p, m], []));
    let map = [];
    map = mapper(cdns, [name], '/')
    map = mapper(map, versionOrLatest, '@');
    map = mapper(map, umdOrDist, '/');
    map = mapper(map, nameOrIndex);
    map = mapper(map, productionMin);
    map = mapper(map, jsOrMjsOrCjs, '.');
    // console.log(map);
    const eraseLine = '\x33[2K\r';

    for(const a in map) {
        console.log(eraseLine+map[a]);
        const res = await fetch(map[a]);
        if(res.status == 200) {
            return await writeRes(res);
        }
    }

    async function writeRes(res) {
        const text = await res.text();
        // console.log(text);
    }

}

async function main() {
    await fetchUnpkgUmd('react-router')
}

main();
