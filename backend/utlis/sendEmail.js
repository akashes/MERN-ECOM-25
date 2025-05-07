import nodemailer from 'nodemailer'

export const sendEmail=async(options)=>{

    try {
        const transporter = nodemailer.createTransport({
            service: process.env.SMTP_SERVICE,
            auth: {
              user: process.env.SMTP_USER, 
              pass: process.env.SMTP_PASS, 
            },
        })
        const mailOptions={
            from:process.env.SMTP_USER,
            to:options.email,
            subject:options.subject,
            html:options.message
        }
        transporter.sendMail(mailOptions,function(error,info){
            if(error){
                console.log(error)
            }else{
                console.log('Email has been sent',info.response)
            }
        })
    } catch (error) {
        console.log(error)
        
    }


}