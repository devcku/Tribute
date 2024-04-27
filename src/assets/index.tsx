// Create an array to store the promises of importing images
const importPromises: Promise<string>[] = [];

// Loop to generate promises for importing images up to img102
for (let i = 1; i <= 102; i++) {
    // Adjust the path accordingly if needed
    const imagePath = `./img (${i}).jpg`;

    // Dynamically import each image and push the promise into the array
    importPromises.push(import(imagePath).then((module) => module.default));
}

// Export a Promise that resolves to the array of images once all imports are resolved
export const imagePathsPromise: Promise<string[]> = Promise.all(importPromises);
