import { IsString, MaxLength } from 'class-validator';
import { isNumber, isDate, isBoolean } from 'util';
 
class CreatePostDto {
  @IsString( {
      each: true
  })
  public author: string[];
 
  @IsString()
  public content: string;
 
  @IsString()
  public title: string;

}
 
export default CreatePostDto;