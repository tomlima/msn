/* 
  Adicione aqui o nome do seu projeto
*/
export default {
  telemetry: false,
  axios: {
    baseURL: 'http://localhost:3000/api/'
  },
  head: {
    title: 'Re-live messeger',
    htmlAttrs: {
      lang: 'pt-BR'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon-32x32.png' }]
  },
  styleResources: {
    scss: ['~/assets/scss/variables.scss']
  },
  publicRuntimeConfig: {},
  css: ['~/assets/css/normalize.css', '~/assets/scss/global.scss', 'boxicons/css/boxicons.min.css'],

  plugins: [{ src: '~/plugins/helper', mode: 'client' }],

  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],

  modules: [
    /* 
      @nuxt/content 
      é um pacote utilizado para leitura de arquivos JSON
      e será necessário apenas para visualização dos conteúdos de exemplo. 
      ao final do projeto é recomendável remover esse pacote.
    */
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    '@nuxtjs/gtm',
    'nuxt-socket-io'
  ],

  io: {
    // module options
    sockets: [
      {
        name: 'main',
        url: 'http://localhost:3001'
      }
    ]
  },

  /* 
    Adicione aqui seu código GTM
    Bastante alterá-lo na propriedade ID
  */
  gtm: {
    id: 'YOUR-GTM-ID',
    enabled: process.env.NODE_ENV == 'production' ? true : false
  },

  buildModules: ['@nuxtjs/google-fonts'],

  /* 
    Adicione novas fontes aqui 
    Bastante criar uma nova entrada ao objeto families
  */
  googleFonts: {
    preload: true,
    families: {
      Poppins: [100, 300, 400, 700],
      Mulish: [100, 300, 400, 700]
    }
  }
}
