const fs = require('fs');
const path = require('path');

// Path to the JSON file containing model data
const jsonFilePath = path.join(__dirname, 'json-output/complete_trained_models.json');

// Realistic Dummy Fragments for image, text, and voice models
const dummyFragments = {
  image: {
    "version": 1,
    "updatedAt": "2023-10-01T12:00:00Z",
    "safety_details": {
      "bias_risks": "May unintentionally promote stereotypes in visual designs.",
      "limitations": "Struggles with complex design elements and high-resolution outputs.",
      "out_of_scope_use": "Should not be used for generating offensive or explicit content.",
      "recommendations": "Review generated images for compliance with brand guidelines."
    },
    "training_details": {
      "training_data": "Trained on a dataset of Chivas product images and branding materials.",
      "preprocessing_steps": "Images were resized and normalized; branding elements were annotated.",
      "hyperparameters": {
        "training_regime": "Used a GAN architecture with specific loss functions for style consistency."
      }
    },
    "evaluation": {
      "testing_data": "Tested on a separate set of brand images not seen during training.",
      "metrics": "Evaluated using FID scores and human evaluator ratings.",
      "results": "Achieved an FID score of 15.2; human evaluators rated outputs 4.5/5 on average."
    },
    "environmental_impact": {
      "hardware_type": "NVIDIA Tesla V100 GPUs",
      "hours_used": 120,
      "cloud_provider": "AWS",
      "compute_region": "us-east-1",
      "carbon_emitted": "Approximately 50 kg CO2"
    },
    "technical_specifications": {
      "model_architecture": "StyleGAN2",
      "compute_infrastructure": "AWS EC2 instances with GPU acceleration",
      "hardware": "8 x V100 GPUs with 16GB VRAM each",
      "software": "PyTorch 1.8.0 with CUDA 11.1"
    },
    "model_sources": {
      "repository": "https://github.com/example/digital-chivas-skins",
      "demo": "https://models.example.com/digital-chivas-skins/demo"
    }
  },
  text: {
    "version": 1,
    "updatedAt": "2023-10-01T12:00:00Z",
    "safety_details": {
      "bias_risks": "May unintentionally promote stereotypes in visual designs.",
      "limitations": "Struggles with complex design elements and high-resolution outputs.",
      "out_of_scope_use": "Should not be used for generating offensive or explicit content.",
      "recommendations": "Review generated images for compliance with brand guidelines."
    },
    "training_details": {
      "training_data": "Trained on a dataset of Chivas product images and branding materials.",
      "preprocessing_steps": "Images were resized and normalized; branding elements were annotated.",
      "hyperparameters": {
        "training_regime": "Used a GAN architecture with specific loss functions for style consistency."
      }
    },
    "evaluation": {
      "testing_data": "Tested on a separate set of brand images not seen during training.",
      "metrics": "Evaluated using FID scores and human evaluator ratings.",
      "results": "Achieved an FID score of 15.2; human evaluators rated outputs 4.5/5 on average."
    },
    "environmental_impact": {
      "hardware_type": "NVIDIA Tesla V100 GPUs",
      "hours_used": 120,
      "cloud_provider": "AWS",
      "compute_region": "us-east-1",
      "carbon_emitted": "Approximately 50 kg CO2"
    },
    "technical_specifications": {
      "model_architecture": "StyleGAN2",
      "compute_infrastructure": "AWS EC2 instances with GPU acceleration",
      "hardware": "8 x V100 GPUs with 16GB VRAM each",
      "software": "PyTorch 1.8.0 with CUDA 11.1"
    },
    "model_sources": {
      "repository": "https://github.com/example/digital-chivas-skins",
      "demo": "https://models.example.com/digital-chivas-skins/demo"
    }
  },
  voice: {
    "version": 1,
    "updatedAt": "2023-08-20T14:45:00Z",
    "safety_details": {
      "bias_risks": "Potential misuse for impersonation or spreading misinformation.",
      "limitations": "May not perfectly mimic nuances of speech; struggles with slang.",
      "out_of_scope_use": "Unauthorized use for commercial purposes or defamation.",
      "recommendations": "Implement user authentication and logging for accountability."
    },
    "training_details": {
      "training_data": "Audio samples from Rigoberto Uran's interviews and speeches.",
      "preprocessing_steps": "Audio clips normalized and annotated for phoneme alignment.",
      "hyperparameters": {
        "training_regime": "Used Tacotron 2 for speech synthesis with custom adjustments."
      }
    },
    "evaluation": {
      "testing_data": "Tested with unseen text inputs and evaluated by native speakers.",
      "metrics": "Assessed using Mean Opinion Score (MOS) and similarity ratings.",
      "results": "Achieved an MOS of 4.3/5; high similarity in voice timbre."
    },
    "environmental_impact": {
      "hardware_type": "NVIDIA RTX 3090 GPUs",
      "hours_used": 150,
      "cloud_provider": "Azure",
      "compute_region": "eastus",
      "carbon_emitted": "Approximately 60 kg CO2"
    },
    "technical_specifications": {
      "model_architecture": "Tacotron 2 with WaveGlow vocoder",
      "compute_infrastructure": "Azure VM instances with GPU support",
      "hardware": "4 x RTX 3090 GPUs",
      "software": "PyTorch 1.7.1 with CUDA 11.0"
    },
    "model_sources": {
      "repository": "https://github.com/example/rigo-voice-model",
      "demo": "https://models.example.com/rigo-voice/demo"
    }
  }
};

// Function to merge two objects without overwriting existing fields
function mergeWithoutOverwriting(target, source) {
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (target[key] === undefined) {
        // Field does not exist in target, so add it
        target[key] = source[key];
      } else if (typeof source[key] === 'object' && !Array.isArray(source[key]) && source[key] !== null) {
        // If the field is an object, recurse
        mergeWithoutOverwriting(target[key], source[key]);
      }
      // Else, do not overwrite the existing field
    }
  }
}

// Function to update documents from the JSON file
async function updateDocumentsFromJson() {
  try {
    // Read the JSON file
    const rawData = fs.readFileSync(jsonFilePath);
    let documents = JSON.parse(rawData);

    // Iterate over each document
    documents = documents.map(doc => {
      let fragment = null;

      // Determine the fragment type based on the tags
      if (doc.tags.includes('image')) {
        fragment = dummyFragments.image;
      } else if (doc.tags.includes('text')) {
        fragment = dummyFragments.text;
      } else if (doc.tags.includes('voice')) {
        fragment = dummyFragments.voice;
      }

      if (fragment) {
        // Merge without overwriting existing fields
        mergeWithoutOverwriting(doc, fragment);
        console.log(`Updated document with label: ${doc.label} and tags: ${doc.tags}`);
      } else {
        console.log(`No matching fragment found for document with label: ${doc.label}`);
      }

      return doc;
    });

    // Write the updated documents back to the JSON file
    fs.writeFileSync(jsonFilePath, JSON.stringify(documents, null, 2));
    console.log('Document update completed and saved to JSON file.');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Run the update function
updateDocumentsFromJson();
