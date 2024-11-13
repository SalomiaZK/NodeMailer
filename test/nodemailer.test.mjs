import { describe, it } from "mocha";
import { createTransport } from "nodemailer";
import TheMail from "../src/entity/TheMail.js";
import { assert } from "chai";
import 'dotenv/config';  // Charge automatiquement le fichier .env

var transporter = createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.FORWARDER_EMAIL,
      pass: process.env.PASSWORD
    }
  });

describe('test about sending mail that should be sent successfully', ()=>{
        let email = new TheMail(
            process.env.FORWARDER_EMAIL, 
            process.env.RECEIVER_EMAIL, 
            "TESTING NODEMAILER", 
            "IF YOU RECEIVE THIS, THAT MEANS WE'RE SAFE"

        )


        let noContentMail = new TheMail(
            process.env.FORWARDER_EMAIL, 
            process.env.RECEIVER_EMAIL, 
            "", 
            ""

        )

        let anotherMail = new TheMail(
            process.env.FORWARDER_EMAIL, 
            process.env.ANOTHER_RECEIVER_EMAIL, 
            "SAYING HELLO", 
            "Hello lucky person, I would be so happy if u receive this xD"
        )
    it("should return Email sent", ()=>{
        transporter.sendMail(email, (error, info)=>{
            assert.isNull(error, "Expected an error")
            assert.include(info.response, "Email sent successfully")
        })

        transporter.sendMail(anotherMail, (error, info)=>{
            assert.isNull(error, "Expected an error")
            assert.include(info.response, "Email sent successfully")
        })

        transporter.sendMail(noContentMail, (error, info)=>{
            assert.isNull(error, "Expected an error")
            assert.include(info.response, "Email sent successfully")
        })

        // assert.equal(transporter.sendMail(email), "Email sent successfully")
        // assert.equal(transporter.sendMail(anotherMail), "Email sent successfully")
        // assert.equal(transporter.sendMail(noContentMail), "Email sent successfully")


    } )

})


describe('test where sending it should fail without forwarder and receiver', ()=>{
    let voidMail = new TheMail("", 
        "", 
        "", 
        ""
    )


    let anotherVoidMail = new TheMail("", 
        "", 
        "Saying hello", 
        "Hiiiii !!!"
    )


    it("should throw an error", ()=>{
        transporter.sendMail(voidMail , (error, info) =>{
                assert.isNotNull(error, "Expected an error")
        })

        transporter.sendMail(anotherVoidMail, (error, info)=>{
            assert.isNotNull(error, "expected an error")
        })
        
    })
}
)

console.log("another", process.env.ANOTHER_RECEIVER_EMAIL)
console.log("receiver", process.env.RECEIVER_EMAIL)
console.log("sender", process.env.FORWARDER_EMAIL)
console.log( "password", process.env.PASSWORD)
