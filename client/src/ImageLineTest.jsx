// Simple test for ImageLine component
import ImageLine from './src/components/courseTemplates/common/ImageLine/index.jsx';

const ImageLineTest = () => {
    const testData = [
        {
            name: "Normal image URL",
            props: {
                img: "https://picsum.photos/800/600?random=3",
                alignment: "center", 
                adjustWidth: true,
                height: 500
            }
        },
        {
            name: "Original problematic URL",
            props: {
                img: "https://amlacademy.kz/aml/0be18375-c71e-44b4-afd3-4197cdbcf8b7",
                alignment: "center",
                adjustWidth: true, 
                height: 500
            }
        }
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h1>ImageLine Component Test</h1>
            {testData.map((test, index) => (
                <div key={index} style={{ marginBottom: '40px', border: '1px solid #ccc', padding: '20px' }}>
                    <h3>{test.name}</h3>
                    <p><strong>Props:</strong> {JSON.stringify(test.props, null, 2)}</p>
                    <div style={{ border: '2px dashed #999', padding: '10px' }}>
                        <ImageLine {...test.props} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ImageLineTest;
