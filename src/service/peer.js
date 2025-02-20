class PeerService {
    constructor() {
        //creating rtc peer
        if (!this.peer) {
            this.peer = new RTCPeerConnection({
                iceServers: [
                    //ice server: a technique used in WebRTC to establish connections between devices over the Internet
                    {
                        urls: [
                          "stun:stun.l.google.com:19302",
                          "stun:global.stun.twilio.com:3478",
                        ],
                      },
                ]
            })
        }
    }

    // create offer - offer is a special description which include the information about the coller
    async getOffer () {
        if (this.peer) {
            const offer = await this.peer.createOffer()
            await this.peer.setLocalDescription(new RTCSessionDescription(offer))
            return offer
        }
    }

// create answer - answer is a special description which include the information about the user who acceot the call
    async getAnswer(offer){
        if(this.peer){
            await this.peer.setRemoteDescription(offer)
            const ans = await this.peer.createAnswer()
            await this.peer.setLocalDescription(new RTCSessionDescription(ans))
            return ans
        }
    }

    async setLocalDescription(ans) {
        if(this.peer){
            await this.peer.setRemoteDescription(new RTCSessionDescription(ans))
        }
    }


}


export default new PeerService()