import {Dimensions, PixelRatio} from 'react-native';

const {width, height} = Dimensions.get('window');

const widthToDp = number =>{
    let w = typeof number === 'number'? number: parseFloat(number);
    return PixelRatio.roundToNearestPixel((width * w)/100);
}

const heightToDp = number =>{
    let h = typeof number === 'number'? number: parseFloat(number);
    return PixelRatio.roundToNearestPixel((height * h)/100);
}

const isOrientation = ref =>{
    Dimensions.addEventListener('change', (newDimension)=>{
        width = newDimension.screen.width;
        height = newDimension.screen.height;

        ref.setState({
            orientation: height > width ? 'portrait' : 'landscape'
        });  
    });
}

const removeOrientation = () =>{
    Dimensions.removeEventListener('change');
}

const getDynamicStyles = (portraitStyles,landscapeStyles)=>{
    if(height > width){
        return portraitStyles;
    }else{
        return landscapeStyles;
    }
}

export{widthToDp, heightToDp, isOrientation, removeOrientation, getDynamicStyles};