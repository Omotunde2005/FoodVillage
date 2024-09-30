const nodemailer = require("nodemailer")


const newDeliveryMail = async(email, location, restaurantName, menuDescription) => {
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
            subject: "New delivery request",
            html: `
                <div>
                    <p>
                    Hello, you have a new delivery request to deliver ${menuDescription} at ${location}. Kindly head to ${restaurantName} to
                    get the order item.
                    </p>
                </div>
            `
        }

        const result = await Transporter.sendMail(emailBody)


    } catch (error) {
        console.log(error.message)
    }
}

const orderCancelledMail = async(email, menuName) => {
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
            subject: "ORDER CANCELLED",
            html: `
                <div>
                    <p>
                    The order for ${menuName} has been cancelled by user. 
                    </p>

                </div>
            `
        }

        const result = await Transporter.sendMail(emailBody)

    } catch (error) {
        console.log(error.message)
    }
}


module.exports = {
    newDeliveryMail,
    orderCancelledMail
}