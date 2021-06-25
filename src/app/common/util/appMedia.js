import { createMedia } from "@artsy/fresnel";


const AppMedia = createMedia({
    breakpoints: {
      mobile: 0,
      tablet: 768,
      computer: 1024,
      largeScreen: 1200,
      widescreen: 1920
    }
  });
  export default AppMedia;