export default class TheMail{
    from : string;
    to : string;
    subject: string;
    text : string;
    constructor(forwarder: string, receiver : string, subject : string, text : string){
        this.from = forwarder
        this.to = receiver
        this.subject = subject
        this.text = text
    }
}