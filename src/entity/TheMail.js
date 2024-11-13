export default class TheMail{
    constructor(forwarder, receiver, subject, text){
        this.from = forwarder
        this.to = receiver
        this.subject = subject
        this.text = text
    }
}