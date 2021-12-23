# Newsletter SignUp
A Newsletter Signup :page_with_curl: page to collect the details of users who are interested in receiving periodic newsletters through email.

## How does it work?
- The frontend of the application (written using ***HTML, CSS & JS***) collects the details of the user.
- The details are send to the backend (written using ***Express & NodeJS***) which then stores the data in your [Mailchimp](https://mailchimp.com/) contacts.
- Details are saved into your Mailchimp contacts using the [Mailchimp Marketing API](https://mailchimp.com/developer/marketing/guides/quick-start/).
- If the details are saved successfully, application redirects the user to Success page. In case of any error, it redirects to Failure page.
