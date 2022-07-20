const Breakpoints = (screenSize) => {
    if(screenSize.width < 540){
        return 'sm';
    }
    else if(screenSize.width < 960){
        return 'md';
    }
    else {
        return 'lg';
    }
};

export default Breakpoints;