public class PSResponse {
    public static final String SUCCESS = 'SUCCESS';
    public static final String ERROR = 'ERROR';

    public String status = SUCCESS;
    public String msg = '';
    public Object data;
}