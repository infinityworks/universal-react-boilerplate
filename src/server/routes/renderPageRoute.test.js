// import cheerio from 'cheerio';
// import { Helmet } from 'react-helmet';
// import renderPageRoute from './renderPageRoute';

describe('server/routes/renderPageRoute', () => {
  it('should run the test', () => {});

  // // convert returned markup into a cheerio dom so we can easily inspect it
  // const getResponseAsDom = (res) => {
  //   expect(res.send.mock.calls).toHaveLength(1);
  //   const renderedHTML = res.send.mock.calls[0][0];
  //   return cheerio.load(renderedHTML);
  // };
  // beforeAll(() => {
  //   // to stop Helmet error where it thinks server calls are made during browser render
  //   Helmet.canUseDOM = false;
  // });

  // it('should render home page', async () => {
  //   const mockReq = { url: '/' };
  //   const mockRes = { send: jest.fn(),
  //     setHeader: jest.fn(),
  //     status: () => ({ sendFile: jest.fn() }) };
  //   await renderPageRoute(mockReq, mockRes);
  //   const $ = getResponseAsDom(mockRes);
  //   expect($('h2').text()).toEqual('Home Page');
  // });

  // it('should render error page', async () => {
  //   const mockReq = { url: '/asdadasd' };
  //   const mockRes = { send: jest.fn(),
  //     setHeader: jest.fn(),
  //     status: () => ({ sendFile: jest.fn() }) };
  //   await renderPageRoute(mockReq, mockRes);
  //   const $ = getResponseAsDom(mockRes);
  //   expect($('h2').text()).toEqual('Error: page not found');
  // });
});
