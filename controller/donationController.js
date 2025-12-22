const announcements = require("../model/announcementModel");
const donations = require("../model/donationModel");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = async (req, res) => {
  console.log("Inside Donation Stripe Controller");

  const { amount, title, announcementId } = req.body;
  const email = req.payload;

  try {
    if (!amount) {
      return res.status(400).json("Amount is required");
    }

    const line_items = [
      {
        price_data: {
          currency: "inr",
          unit_amount: Math.round(amount * 100),
          product_data: {
            name: title || "WeCare Donation",
            metadata: {
              announcementId,
              donatedBy: email,
              donationType: "Money",
            },
          },
        },
        quantity: 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: "http://localhost:5173/payment-success",
      cancel_url: "http://localhost:5173/payment-cancel",
      line_items,
      mode: "payment",
    });

    console.log(session);

    return res.status(200).json({
      checkoutSessionUrl: session.url,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};


//NON-MONEY DONATION (Food / Clothes / etc)
exports.makeDonationController = async (req, res) => {
  console.log("Inside Make Donation Controller");

  const { id } = req.params; // ✅ announcement ID from URL
  const {
    donationType,
    amount,
    quantity,
    pickup_location,
    notes
  } = req.body;

  const userMail = req.payload

  try {
    if (!donationType) {
      return res.status(400).json("Donation Type is required");
    }

    const announcement = await announcements.findById(id);
    if (!announcement || announcement.announcementType !== "donation") {
      return res.status(404).json("Invalid donation announcement");
    }

    const newDonation = new donations({
      announcementId: id,
      title: announcement.title,
      abstract: announcement.abstract,
      userMail,
      donationType,
      amount: donationType === "Money" ? amount : null,
      quantity: donationType !== "Money" ? quantity : null,
      pickup_location: donationType !== "Money" ? pickup_location : "",
      notes,
      paymentStatus: donationType === "Money" ? "paid" : "pending",
    });

    await newDonation.save();
    res.status(200).json(newDonation);

  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};


//GET SINGLE DONATION
exports.getADonationController = async (req, res) => {
  try {
    const { id } = req.params;
    const donation = await donations.findOne({ announcementId: id });
    res.status(200).json(donation);
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET USER DONATIONS
exports.getAllDonationController = async (req, res) => {
  try {
    const email = req.payload;
    const allDonations = await donations.find({ userMail: email });
    res.status(200).json(allDonations);
  } catch (error) {
    res.status(500).json(error);
  }
};
