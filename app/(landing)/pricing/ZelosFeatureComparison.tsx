import React from 'react';
import './ZelosFeatureComparison.css'; // Import CSS file for styling

interface Feature {
  Basic: string;
  Silver: string;
  Premium: string;
}

interface Section {
  [feature: string]: Feature;
}

interface JsonData {
  [section: string]: Section;
}

interface Props {
  jsonData: JsonData | null;
}

const ZelosFeatureComparison: React.FC<Props> = ({ jsonData }) => {
  if (!jsonData) {
    // Handle case where jsonData is undefined or null
    return <div>No data available</div>;
  }

  const generateTable = (sectionName: string, subsectionData: Section) => {
    let html = `<h2 class="table-title">${sectionName.replace(/_/g, ' ')}</h2>`;
    html += '<table class="table">';
    // Generate table headers for tiers only once
    const tiers: (keyof Feature)[] = ['Basic', 'Silver', 'Premium'];
    html += '<tr><th>Feature</th>';
    tiers.forEach(tier => {
      html += `<th>${tier}</th>`;
    });
    html += '</tr>';
    
    // Iterate over features
    for (const featureKey in subsectionData) {
      if (subsectionData.hasOwnProperty(featureKey)) {
        const featureValue = subsectionData[featureKey];
        html += '<tr>';
        html += `<td class="feature-name">${featureKey.replace(/_/g, ' ')}</td>`; // Feature
        // Iterate over tiers
        tiers.forEach(tier => {
          const value = featureValue[tier];
          html += `<td class="feature-value">${value}</td>`; // Value for each tier
        });
        html += '</tr>';
      }
    }
    html += '</table>';
    return { __html: html }; // Wrap in an object with __html key
  };

  return (
    <div className="container">
      {Object.entries(jsonData).map(([sectionKey, sectionValue], index) => (
        <div key={index} className="card">
          <div dangerouslySetInnerHTML={generateTable(sectionKey, sectionValue)}></div>
        </div>
      ))}
    </div>
  );
};

export default ZelosFeatureComparison;
