import { GOOGLE_TAG_MANAGER_ID } from '../../config/server';

// The following snippets are defined here:
// https://developers.google.com/tag-manager/quickstart
//

const buildHead = (id) => `<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${id}');</script>`;

const buildBody = (id) => `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${id}"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`;

export const head = () => (GOOGLE_TAG_MANAGER_ID !== '' ? buildHead(GOOGLE_TAG_MANAGER_ID) : '');
export const body = () => (GOOGLE_TAG_MANAGER_ID !== '' ? buildBody(GOOGLE_TAG_MANAGER_ID) : '');
