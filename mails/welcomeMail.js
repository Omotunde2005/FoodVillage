const nodemailer = require("nodemailer")


const sendEmail = async(email, username) => {
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
            subject: "WELCOME TO FOOD VILLAGE",
            html: `
                <div>
                    <h1>Hi ${username}</h1>
                    <p>
                        We are pleased to welcome you to Food Village, the number one place for all African dishes and restaurants. 
                        You can find various restaurants and their mouth watering cuisines on our website. Now, you don't just have to seee,
                        you can also make your orders and get it directly to your doorstep. Visit our <a href="https://www.foodvillage.com">website</a> to learn more.
                    </p>
                </div>
            `
        }

        const result = await Transporter.sendMail(emailBody)

    } catch (error) {
        console.log(error.message)
    }
}


module.exports = sendEmail