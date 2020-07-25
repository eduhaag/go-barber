import IParseTemplateMailDTO from '../../MailtemplateProvider/dtos/IParseMailTemplateDTO';

interface IMailContent {
  name: string;
  email: string;
}

export default interface ISendMailDTO {
  to: IMailContent;
  from?: IMailContent;
  subject: string;
  templateData: IParseTemplateMailDTO;
}
