import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'

const name = 'index'

export default [
    {
        input: `src/${name}.ts`,
        plugins: [esbuild({
            tsconfig: './tsconfig.json',
        })],
        output: [
            {
                file: `build/${name}.cjs`,
                format: 'cjs',
                sourcemap: true,
            },
            {
                file: `build/${name}.js`,
                format: 'es',
                sourcemap: true,
            },
        ],
        external: ['unidecode'],
    },
    {
        input: `src/@types/${name}.d.ts`,
        plugins: [dts()],
        output: {
            file: `build/${name}.d.ts`,
            format: 'es',
        },
    },
]
