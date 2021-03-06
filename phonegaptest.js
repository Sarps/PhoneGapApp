var accelID = null;
/**
 * accel --> called when clicking the accel button
 */
function accel(){
    var options = { frequency: 200 };
    accelID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
}

/**
 * film --> called when clicking the film button
 */
function film(){
    var destinationType = navigator.camera.DestinationType;
    var sourceType = navigator.camera.PictureSourceType;    
    var options = { quality: 100, 
        destinationType:destinationType.FILE_URI,
        sourceType:sourceType.CAMERA,
        correctOrientation:true};
    navigator.camera.getPicture(onPhotoSuccess,onFail, options );
}

/**
 * stop --> called when clicking the stop button
 */
function stop(){
    if (accelID) {
        navigator.accelerometer.clearWatch(accelID);
        accelID = null;
    }
    $("#information").html("");
}

/**
 * onSuccess: Get a snapshot of the current acceleration
 */ 
function onSuccess(acceleration) {
    var x = acceleration.x;
    var y = acceleration.y;
    var z = acceleration.z;
    $("#information").html("acc_x: "+x.toFixed(2)+
                           " - acc_y: "+y.toFixed(2)+
                           " - acc_z: "+z.toFixed(2) );
}

/**
 * onError: Failed to get the acceleration
 */
function onError() {
    $("#information").html("get accel failed");
}

/**
 * onPhotoDataSuccess: Get the picture you just took with the camera
 */
function onPhotoSuccess(imageURI) {
    $("#information").html("get picture success");
    var src = imageURI;
    $("#canvas").attr('src', src);    
}
    
/**
 * onFail: Failed to get the picture
 */ 
function onFail() {
    $("#information").html("get picture failed");
}