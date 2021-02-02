export class ApiUrls {
  public static baseUrlAuth = "http://localhost:3001/auth";
  public static baseUrlInternship = "http://localhost:3003";
  public static AddUser = ApiUrls.baseUrlAuth + "/register";
  public static Internship = ApiUrls.baseUrlInternship + "/internships";
  public static UploadCV = ApiUrls.baseUrlInternship + "/uploadCV";
  public static Authenticate = ApiUrls.baseUrlAuth + "/login";
}
