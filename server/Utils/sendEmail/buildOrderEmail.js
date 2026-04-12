function buildOrderEmail(to_name, message) {
  return `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background: #fdfdfd; border: 1px solid #eaeaea;">
    <h2 style="color: #2c3e50;">Thanks for your order, ${to_name}! 🎉</h2>

    <p style="font-size: 16px; color: #555;">
      We're excited to let you know that we've received your order and it's being processed. Below are the details:
    </p>

    <div style="margin: 20px 0; padding: 15px; background: #f4f4f4; border-left: 4px solid #4CAF50;">
      <p style="font-size: 15px; color: #333; margin: 0;">${message}</p>
    </div>

    <p style="font-size: 14px; color: #777;">You will receive another email when your order ships.</p>
    <hr style="margin: 30px 0;" />

    <p style="font-size: 13px; color: #999;">If you have any questions, feel free to reply to this email or contact our support team.</p>
    <p style="font-size: 13px; color: #999;">&copy; 2025 Musicrafters. All rights reserved.</p>
  </div>
  `;
}

export default buildOrderEmail;
