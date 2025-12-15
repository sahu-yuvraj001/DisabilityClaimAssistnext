export async function POST(req) {
  try {
    console.log("📨 Request received at /api/submit-lead");

    const body = await req.json();
    console.log("Payload received from frontend:", body);

    // ✅ Get user IP safely (server-side)
    const forwarded = req.headers.get("x-forwarded-for");
    const userIp = forwarded?.split(",")[0] || "127.0.0.1";

    // ✅ Build Phonexa payload (same as Express)
    const leadPayload = {
      apiId: process.env.PHONEXA_API_ID,
      apiPassword: process.env.PHONEXA_API_PASSWORD,
      productId: 265,
      price: "0.50",

      // Core user info
      firstName: body.firstName?.trim() || "John",
      lastName: body.lastName?.trim() || "Doe",
      dob: body.dob || "1985-01-01",
      email: body.email?.trim() || "john.doe@example.com",
      phone: body.phone?.trim() || "5551234567",
      homePhone: body.homePhone?.trim() || "5551234567",
      workPhone: body.workPhone?.trim() || "5551234567",
      ssn: body.ssn?.trim() || "123456789",

      // Address
      address: body.address?.trim() || "123 Main St",
      city: body.city?.trim() || "Los Angeles",
      state: body.state?.trim() || "CA",
      zip: body.zip?.trim().slice(0, 5) || "90001",

      // System info
      userIp,
      webSiteUrl: "disabilityclaimassist.com",
      leadid_token: body.leadid_token || "",
      trustedform_cert_url: body.trustedform_cert_url || "",

      // Employment / income
      activeMilitary: body.activeMilitary || "NO",
      workCompanyName: body.workCompanyName || "Example Company",
      jobTitle: body.jobTitle || "Worker",
      currentlyemployed: body.currentlyemployed || "yes",
      incomeType: body.incomeType || "EMPLOYMENT",
      incomePaymentFrequency: body.incomePaymentFrequency || "MONTHLY",
      incomeNetMonthly: body.incomeNetMonthly || "3000",
      incomeNextDate1: body.incomeNextDate1 || "2025-12-01",
      incomeNextDate2: body.incomeNextDate2 || "2025-12-30",

      // Banking
      bankDirectDeposit: body.bankDirectDeposit || "YES",
      bankAba: body.bankAba || "123456789",
      bankName: body.bankName || "Example Bank",
      bankAccountNumber: body.bankAccountNumber || "987654321",
      bankAccountType: body.bankAccountType || "CHECKING",
      bankAccountLengthMonths: body.bankAccountLengthMonths || 24,

      // Additional info
      unsecuredDebt: body.unsecuredDebt || "500",
      autoTitle: body.autoTitle || "NO",
      loanPurpose: body.loanPurpose || "Personal",
      clickid: body.clickid || "TXN1234567890",
      source: body.source || "Website",
      affId: body.affId || "AFF123",

      // Tracking params
      tPar: {
        affiliateId: body.affiliateId || "AFF123",
        transactionId: body.transactionId || "TXN1234567890",
        offerId: body.offerId || "OFFER123",
      },
    };

    const phonexaUrl =
      "https://leads-inst523-client.phonexa.com/lead/";

    const response = await fetch(phonexaUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(leadPayload),
    });

    let data;
    try {
      data = await response.json();
    } catch {
      data = await response.text();
    }

    console.log("✅ Phonexa response:", data);

    return Response.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("❌ Error submitting lead:", error.message);
    return Response.json(
      { error: "Lead submission failed" },
      { status: 500 }
    );
  }
}
