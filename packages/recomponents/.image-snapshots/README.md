# Image snapshot testing

The image-snapshots tests based on storybook examples,  
please make as many demos as you can.  
    
The images could be a little different on some OS,  
please use docker for images generation.  

Please check the documentation of package [storyshots-puppeteer](https://github.com/storybookjs/storybook/tree/master/addons/storyshots/storyshots-puppeteer)


The root directory to run the docker is `packages/recomponents`    
The command is `docker-compose -f ./.image-snapshots/docker-compose.yml up --build`  

**WARNING** The images should be generated into the docker container.    


## Structure
```
.image-snapshots - directory with configuration files and images

.image-snapshots/__image_snapshots__ - directory with image snapshots
.image-snapshots/__image_snapshots__/__diff_output__ - directory with image difference (test result)

.image-snapshots/jest.config.js - custom jest configuration file for snapshot testing
.image-snapshots/register-context - file to solve the problem with require.context in the jest

.image-snapshots/storyshots-image.runner.js - root image generation file (jest test file) 
```

## Configuration 
Please check `storyshots-image.runner.js`  
We have 2 variables with custom options per component (delay or custom allowed difference value).  
  
`componentsWithLoaderIcon` - list with components that rendered some `loader` icons, the difference of that files could be 0.015%.  
`componentsWithAsyncData` - list with components that loaded some async data, the difference 0% but each component has some custom (personal) delay.  

 
## Run images generation/tests
``` 
cd packages/recomponents
yarn build-storybook
docker-compose -f ./.image-snapshots/docker-compose.yml up --build
```
