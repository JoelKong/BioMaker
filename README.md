# BioMaker
A dynamic biography generator that allows users to personalize their profiles by highlighting their unique skills and incorporate their preferred writing style.

![BioMaker](/assets/biomaker.PNG)

## Application Code
### Full-Stack Framework
Development: Next.JS with React.js and Typescript  
Deployed with: Vercel  
Tools used: OpenAI's GPT-3, RegEx, Next.JS Edge functions with ReadableStreams  
A dynamic prompt was send to the GPT-3 API based off the user's input and was displayed through a readable stream. Next.JS allows for more effective SEO and also implements static generation to reduce page load. Using Edge functions also improves the user experience by reflecting parts of the output even before it finishes loading.


## Validity Checking
If users fail to fill in the required fields or enter invalid values, the program will reflect it on the front end through an error modal and also highlighting the fields where the user did not do what was expected.

![Validity](/assets/validity.gif)

## Generate Biography
Once users are satisfied with their inputs, the prompt will be sent to the GPT-3 API and data will be passed through a readable stream to be displayed letter by letter so that users would not have to wait for the entire answer to be loaded before it is shown. This greatly boosts the user experience as users wont be tempted to bounce off the page due to the fast answer generation.

![GenerateBio](/asset/generate.gif)
