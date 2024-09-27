const nodemailer = require("nodemailer")


const resetPasswordMail = async(email, password) => {
    try {
        const Transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: `${process.env.MY_EMAIL}`,
                pass: `${process.env.EMAIL_PASSWORD}`
            }
        })

        const emailBody = {
            from: process.env.MY_EMAIL,
            to: email,
            subject: "PASSWORD RESET",
            html: `
                <div>
                    <p>
                    Your reset password is ${password}
                    </p>
                </div>
            `
        }

        const result = await Transporter.sendMail(emailBody)

        return true

    } catch (error) {
        console.log(error.essage)
        return false
    }
}


module.exports = resetPasswordMail