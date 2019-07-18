import { IsString,MinLength, MaxLength } from 'class-validator';
 
class CreateUserDto {
  @IsString( {
      each: true
  })
  public posts: string[];
 
  @IsString()
  public email: string;
 
  @IsString()
  public name: string;
}
 
export default CreateUserDto;