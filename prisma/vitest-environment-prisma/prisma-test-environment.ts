import { Environment } from "vitest";

const prismaEnvironment: Environment = {
    name: 'prisma',
    async setup() {
        console.log('Setup');

        return {
            async teardown() {
                console.log('Teardown');
            }
        };
    },
    transformMode: 'web'  // ou 'ssr', dependendo do seu caso de uso
};

export default prismaEnvironment;
