interface IEmailProvider {
  sendMail(
    to: string,
    subject: string,
    variables: any,
    contentPath: string
  ): Promise<void>;
}

export { IEmailProvider };
