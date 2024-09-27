const nodemailer = require("nodemailer")


const newOrderMail = async(email, username, menuDescription, restaurantName, riderContact) => {
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
            subject: "YOUR ORDER IS BEING PROCESSED",
            html: `
                <div>
                    <h1>Hi ${username}</h1>
                    <p>
                    Your order for ${menuDescription} from ${restaurantName} is being processed. 
                    </p>

                    <p>Kindly follow up with the rider @ ${riderContact}</p>
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

module.exports = {
    newOrderMail
}