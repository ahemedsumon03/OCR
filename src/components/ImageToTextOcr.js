import React, {Component,Fragment} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import imagePlaceHolder from '../assets/images/imagePlaceholder.svg';
import Loader from "./Loader";
import Tesseract from 'tesseract.js';
import {Animated} from "react-animated-css";
class ImageToTextOcr extends Component {

    constructor(props) {
        super(props);
        this.state = {
            previewImage:imagePlaceHolder,
            selectlang:'',
            ocrResult:'..',
            onLoader:'d-none'
        }
    }

    onChangeHandler=(event)=>{
        let imageurl = event.target.files[0];
        let reader = new FileReader();
        reader.onload = (e)=>{
            this.setState({previewImage:e.target.result})
        }
        reader.readAsDataURL(imageurl)
    }

    onChooseHandler=(event)=>{
        let langvalue = event.target.value;
        this.setState({selectlang:langvalue})
    }

    doOCR=()=>{
        this.setState({onLoader:''})
        let imageSrc = this.state.previewImage;
        let lang = this.state.selectlang;
        Tesseract.recognize(imageSrc,lang).then(res=>{
            this.setState({ocrResult:res['data']['text']})
            this.setState({onLoader:'d-none'})
        }).catch(err=>{
            this.setState({onLoader:'d-none'})
            alert('Something went wrong')
        })
    }

    render() {
        return (
            <Fragment className='priorityone'>
                <Container>
                    <Row className='d-flex justify-content-center mt-2'>
                        <Col sm={4} md={6} lg={6}>
                            <Animated animationInDelay={400} animationInDuration={400} animationIn="zoomIn" animationOut="fadeOut" isVisible={true}>
                                <div className='input-div'>
                                    <img src={this.state.previewImage} className='preview-img' alt='imagePlaceholder'/>
                                    <Row className='mt-3'>
                                        <Col sm={5} md={5} lg={5}>
                                            <div className='bg-white p-2'>
                                                <input onChange={this.onChangeHandler} type='file'/>
                                            </div>
                                        </Col>
                                        <Col sm={5} md={5} lg={5}>
                                            <div className='bg-white p-2'>
                                                <select onChange={this.onChooseHandler}>
                                                    <option>Choose Language</option>
                                                    <option value='ben'>Bangla</option>
                                                    <option value='eng'>English</option>
                                                    <option value='fra'>French</option>
                                                    <option value='ara'>Arabic</option>
                                                    <option value='dan'>Danish</option>
                                                </select>
                                            </div>
                                        </Col>
                                        <Col sm={2} md={2} lg={2}>
                                            <button onClick={this.doOCR} className='btn btn-primary'>OCR</button>
                                        </Col>
                                    </Row>
                                </div>
                            </Animated>
                        </Col>
                        <Col sm={4} md={6} lg={6}>
                            <Animated animationInDelay={400} animationInDuration={400} animationIn="zoomIn" animationOut="fadeOut" isVisible={true}>
                                <div className='ocr-div'>
                                    <p className='text-white'>{this.state.ocrResult}</p>
                                </div>
                            </Animated>
                        </Col>
                    </Row>
                </Container>
                <div className={this.state.onLoader}>
                    <Loader/>
                </div>
            </Fragment>
        );
    }
}

export default ImageToTextOcr;