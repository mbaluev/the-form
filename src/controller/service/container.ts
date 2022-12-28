import { Container } from 'inversify';
import { SERVICE } from '@service/ids';
import { IModuleService } from '@service/modules/module/interface';
import { ModuleService } from '@service/modules/module';
import { IBlockService } from '@service/modules/block/interface';
import { BlockService } from '@service/modules/block';
import { IDocumentService } from '@service/modules/document/interface';
import { DocumentService } from '@service/modules/document';
import { IFileService } from '@service/modules/file/interface';
import { FileService } from '@service/modules/file';
import { IQuestionService } from '@service/modules/question/interface';
import { QuestionService } from '@service/modules/question';
import { IUserService } from '@service/modules/user/interface';
import { UserService } from '@service/modules/user';
import { IAuthService } from '@service/modules/auth/interface';
import { AuthService } from '@service/modules/auth';

export const serviceContainer = new Container();

serviceContainer.bind<IAuthService>(SERVICE.Auth).to(AuthService);

serviceContainer.bind<IUserService>(SERVICE.User).to(UserService);

serviceContainer.bind<IModuleService>(SERVICE.Module).to(ModuleService);

serviceContainer.bind<IBlockService>(SERVICE.Block).to(BlockService);

serviceContainer.bind<IDocumentService>(SERVICE.Document).to(DocumentService);

serviceContainer.bind<IFileService>(SERVICE.File).to(FileService);

serviceContainer.bind<IQuestionService>(SERVICE.Question).to(QuestionService);
