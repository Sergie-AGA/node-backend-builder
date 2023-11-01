interface IEmailRepository {
  sendMail(
    to: string,
    subject: string,
    variables: any,
    contentPath: string
  ): Promise<void>;
}

export { IEmailRepository };
