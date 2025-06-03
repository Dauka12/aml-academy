const fs = require('fs');
const path = require('path');

// Files that need to be updated to use processTextWithFormattingHTML for dangerouslySetInnerHTML
const filesToUpdate = [
    'src/components/courseTemplates/common/TextWithTitle/index.jsx',
    'src/components/courseTemplates/common/NumberedDots/index.jsx',
    'src/components/courseTemplates/common/NotNumberedDots/index.jsx',
    'src/components/courseTemplates/common/RandomParagraph/index.jsx',
    'src/components/courseTemplates/common/RandomH2/index.jsx',
    'src/components/courseTemplates/common/SimpleTable/index.jsx',
    'src/components/courseTemplates/common_v2/FancyList/index.jsx',
    'src/components/courseTemplates/common/ComplexTable/index.jsx',
    'src/components/courseTemplates/common/TextWithBackground/index.jsx',
    'src/components/courseTemplates/common_v2/ImageAndColumns/index.jsx',
    'src/components/courseTemplates/common_v2/Quote/index.jsx',
    'src/components/courseTemplates/common_v2/IconDots/index.jsx',
    'src/components/courseTemplates/common_v2/ImageSequence/index.jsx',
    'src/components/courseTemplates/common/FileDownloader/index.jsx',
    'src/components/courseTemplates/common/TextWithBold/index.jsx',
    'src/components/courseTemplates/common_v2/FlexBoxes/index.jsx',
    'src/components/courseTemplates/common_v2/FlexRow/index.jsx',
    'src/components/courseTemplates/complex/CustomCarousel/index.jsx',
    'src/components/courseTemplates/complex/DataChain/index.jsx',
    'src/components/courseTemplates/complex/StageDropDown/index.jsx',
    'src/components/courseTemplates/complex/TabsGlossary/index.jsx',
    'src/components/courseTemplates/complex/TextAndLink/index.jsx',
    'src/components/courseTemplates/complex/Component52/index.jsx',
    'src/components/courseTemplates/complex/DropdownGlossaryList/index.jsx',
    'src/components/courseTemplates/complex/DragAndDropTwoSide/index.jsx'
];

console.log('Starting text formatting fixes...');

// Process each file
filesToUpdate.forEach(filePath => {
    try {
        const fullPath = path.resolve(filePath);
        console.log(`Processing: ${fullPath}`);
        
        if (fs.existsSync(fullPath)) {
            let content = fs.readFileSync(fullPath, 'utf8');
            
            const originalContent = content;
            
            // Update import statement
            content = content.replace(
                /import { processTextWithFormatting } from '[^']+'/g,
                "import { processTextWithFormattingHTML } from '../../../../util/TextFormattingEnhancer.jsx'"
            );
            
            // Update usage in dangerouslySetInnerHTML
            content = content.replace(
                /__html: processTextWithFormatting\(/g,
                '__html: processTextWithFormattingHTML('
            );
            
            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content);
                console.log(`✅ Updated: ${filePath}`);
            } else {
                console.log(`⚪ No changes needed: ${filePath}`);
            }
        } else {
            console.log(`❌ File not found: ${filePath}`);
        }
    } catch (error) {
        console.log(`❌ Error processing ${filePath}: ${error.message}`);
    }
});

console.log('Text formatting fixes completed!');
