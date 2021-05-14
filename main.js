prediction_1 = "";
prediction_2 = "";
confidence1 = "";
confidence2 = "";
C1 = "";
C2 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
});

camera = document.getElementById('camera');

Webcam.attach(camera);

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById('result').innerHTML = "<img id='captured_img' src='"+data_uri+"'>";
    });
}

console.log("ml5 version", ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/orwnb4yeg/model.json', modelLoaded);

function modelLoaded(){
    console.log("Model Loaded");
}



function speakComputer(){
    var synth = window.speechSynthesis;
    speak_data_1 = 'The first prediction is '+prediction_1;
    speak_data_2 = 'and the second prediction is '+prediction_2;
    speak_data_3 = 'The confidence level of the first prediction is '+C1;
    speak_data_4 = 'and the confidence level of the second prediction is '+C2;
    var utter = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2 + speak_data_3 + speak_data_4);
    synth.speak(utter);
}

function check(){
    img = document.getElementById('captured_img');
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if (error){
        console.error(error);
    }
    else {
        console.log(results);
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        confidence1 = results[0].confidence;
        confidence2 = results[1].confidence;
        C1 = confidence1.toFixed(3)
        C2 = confidence2.toFixed(3)
        document.getElementById("result_emotion_name").innerHTML = prediction_1;
        document.getElementById("result_emotion_name2").innerHTML = prediction_2;
        document.getElementById("confidence").innerHTML = "Confidence is "+C1 * 100+"%";
        document.getElementById("confidence2").innerHTML = "Confidence is "+C2 * 100+"%";
        speakComputer();

        if(prediction_1 == "Happy"){
            document.getElementById("update_emoji").innerHTML = "&#128512;";
        }
        if(prediction_1 == "Sad"){
            document.getElementById("update_emoji").innerHTML = "&#128546;";
        }
        if(prediction_1 == "Angry"){
            document.getElementById("update_emoji").innerHTML = "&#128545;";
        }
        if(prediction_2 == "Happy"){
            document.getElementById("update_emoji2").innerHTML = "&#128512;";
        }
        if(prediction_2 == "Sad"){
            document.getElementById("update_emoji2").innerHTML = "&#128546;";
        }
        if(prediction_2 == "Angry"){
            document.getElementById("update_emoji2").innerHTML = "&#128545;";
        }
    }
}