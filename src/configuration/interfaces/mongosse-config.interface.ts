export interface IMongooseConfigOptions {
  user: string;
  pass: string;
  dbName: string;
  authSource: string;
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
  autoIndex: boolean;
  maxPoolSize: number;
  serverSelectionTimeoutMS: number;
  socketTimeoutMS: number;
}

export interface IMongooseConfig {
  uri: string;
  options?: IMongooseConfigOptions;
  // options?: Record<string, any>;
}
