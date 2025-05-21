import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop()
  role: string;

  @Prop()
  created_user: string;

  @Prop({ default: () => Date.now() })
  created_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
