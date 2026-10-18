# Cloudflare Access branding

What Cloudflare Access lets you customise, and the assets for it.

| Page                | What can be customised                                           | Plan                         |
| ------------------- | ---------------------------------------------------------------- | ---------------------------- |
| Login page          | Organization name, logo (URL), header, footer, background colour | All plans                    |
| Block page (denied) | Full custom HTML (`block-page.html`)                             | Pay-as-you-go and Enterprise |

The login page does **not** accept custom HTML.

## Files

- `../public/brand/access-logo.png` and `.svg`: AI4DEV logo, text converted to paths (no font needed). Deployed with the site at `/brand/`.
- `block-page.html`: self-contained block page (inline CSS, logo and Bangers font embedded, IT + EN). Replace `__CONTACT__` with the contact email before pasting it.

## 1. Make the logo reachable

The login page loads the logo from a public URL. If Access protects the whole site, it would block its own logo too.

1. Deploy the site: `pnpm cf:deploy` (publishes `/brand/access-logo.png`).
2. Zero Trust → Access → Applications → Add an application → Self-hosted.
   - Name: `AI4Dev brand assets`
   - Domain: same host as the cheatsheet, path `brand/*`
   - Policy: action **Bypass**, include **Everyone**
3. Check that `https://<your-domain>/brand/access-logo.png` opens in a private window without a login.

Alternative: host the logo on any public URL (e.g. the company website).

## 2. Login page

Zero Trust → Reusable components → Custom pages → Access login page → Manage.

| Field             | Value                                                                             |
| ----------------- | --------------------------------------------------------------------------------- |
| Organization name | `AI4Dev · Field Manual`                                                           |
| Logo              | `https://<your-domain>/brand/access-logo.png`                                     |
| Header text       | `Riservato ai partecipanti del corso AI4Dev · AI4Dev participants only`           |
| Footer text       | `WellD Sagl · Usa l'email con cui sei iscritto · Use the email you enrolled with` |
| Background color  | `#1c0b26`                                                                         |

Check the preview card, then Save. The login page applies to every Access application in the account.

## 3. Block page (paid plans only)

1. Replace `__CONTACT__` in `block-page.html` with the contact email.
2. Zero Trust → Reusable components → Custom pages → Access custom pages → Manage → Add a page template.
   - Name: `AI4Dev denied`
   - Type: identity-based failure
   - Custom HTML: paste the whole `block-page.html`
   - Use **Download** to preview it in a browser, then Save.
3. Open the cheatsheet Access application → its block page setting → choose `AI4Dev denied`.

The "Use another email" button links to `/cdn-cgi/access/logout`, which ends the Access session so the user can sign in again.
