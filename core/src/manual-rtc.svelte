<script lang="ts">
    const peerConnection: RTCPeerConnection = new RTCPeerConnection();
    let offer;
    let receivedOffer;
    let answer;
    let receivedAnswer;
    let connectionState;
    let iceCandidates = [];
    let receivedIceCandidates;
    let sendChannel;

    peerConnection.onicecandidate = (event) => {

        const candidate = event?.candidate?.toJSON();

        if (candidate) {
            iceCandidates = [...iceCandidates, candidate];
            console.log('New ICE candidate: ', candidate);
        }
    }

    peerConnection.addEventListener("connectionstatechange", function() {
        connectionState = peerConnection.connectionState;
    });

    async function createOffer() {
        sendChannel = peerConnection.createDataChannel('sendDataChannel');
        offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
    }

    async function answerOffer() {
        if (receivedOffer) {
            await peerConnection.setRemoteDescription(JSON.parse(receivedOffer));
            answer = await peerConnection.createAnswer();
        }
    }

    async function setLocalAnswer() {
        if (answer) {
            await peerConnection.setLocalDescription(answer);
        }
    }

    async function acceptAnswer() {
        if (receivedAnswer) {
            await peerConnection.setRemoteDescription(JSON.parse(receivedAnswer));
        }
    }

    async function addIceCandidate() {
        if (receivedIceCandidates) {

            for (const candidate of JSON.parse(receivedIceCandidates)) {
                await peerConnection.addIceCandidate(candidate);
            }
        }
    }
</script>

<div style="background-color: white;">
    <h1> Connexion RTC manuelle ({connectionState}) </h1>

    <div class="container">
        <textarea disabled> { JSON.stringify(offer, null, 4) } </textarea>
        <br>
        <button on:click={createOffer}> Creer une demande de connexion. </button>
    </div>

    <div class="container">
        <textarea bind:value={ receivedOffer }/> 
        <br>
        <button on:click={answerOffer}> Repondre a une demande de connexion. </button>
        <br>
        <textarea disabled> { JSON.stringify(answer, null, 4) } </textarea>
        <br>
        <button on:click={setLocalAnswer}> Finaliser la reponse de demande de connexion. </button>
    </div>

    <div class="container">
        <textarea bind:value={ receivedAnswer }/> 
        <br>
        <button on:click={acceptAnswer}> Accepter une reponse de demande connexion. </button>
    </div>

    <div class="container">
        <div>
            <textarea disabled> { JSON.stringify(iceCandidates, null, 4) } </textarea>
        </div>

        <br>
        <textarea bind:value={ receivedIceCandidates }/>
        <button on:click={addIceCandidate}> Ajouter un candidat ICE. </button>
    </div>
</div>

<style>
    .container {
        padding: 1rem;
        border: 1px solid black;
        margin: 1rem;
    }
</style>