import { SwaggerUiOptions } from 'swagger-ui-express';
import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
    swaggerDefinition:{
        openapi: '3.0.2',
        tags: [
            {
                name: 'Products',
                description: 'API operations related to products'
            }
        ],
        info: {
            title: 'REST API Node.js / Express / TypeScript',
            version: '1.0.0',
            description: 'API Docs for Products'
        }
    },
    apis: ['./src/router.ts']
}

const swaggerSpect = swaggerJSDoc(options)

const swaggerUiOptions : SwaggerUiOptions = {
    customCss : `
        .topbar-wrapper .link {
            content: url('https://static.wixstatic.com/media/8eda6f_e0b54f51eaa84180a1cbac7ebf1962e1~mv2.png/v1/fill/w_94,h_94,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/8eda6f_e0b54f51eaa84180a1cbac7ebf1962e1~mv2.png');
        }

        .topbar-wrapper {
            width: 100px;
            height: 100px;
        }

        .swagger-ui .topbar {
            background-color: #CCCCCC;
        }

    `
}

export default swaggerSpect

export {
    swaggerUiOptions
}