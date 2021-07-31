import React, {Component} from 'react';
import ImageToTextOcr from "../components/ImageToTextOcr";
import MenuBar from "../components/MenuBar";

class ImageToTextOcrPage extends Component {
    render() {
        return (
            <div>
                <MenuBar/>
                <ImageToTextOcr/>
            </div>
        );
    }
}

export default ImageToTextOcrPage;