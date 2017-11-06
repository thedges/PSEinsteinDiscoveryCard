public class PSEinsteinDiscoveryCardController {
    @AuraEnabled
    public static String getEDInfo(String params)
    {
        System.debug('getEDInfo invoked...');
        System.debug('params=' + params);
        Map<String, String> paramMap = (Map<String, String>)JSON.deserialize(params,   Map<String, String>.class);
        PSResponse resp = new PSResponse();
        
        try
        {
            String recId = paramMap.get('recId');
            String outcomeField = paramMap.get('outcomeField');
            
            // get the object name
            String objectName = ID.valueOf(recId).getSObjectType().getDescribe().getName();
            
            String queryStr = 'SELECT Id,' + outcomeField;
            if (paramMap.get('section1Field') != null) queryStr += ', ' + paramMap.get('section1Field');
            if (paramMap.get('section2Field') != null) queryStr += ', ' + paramMap.get('section2Field');
            queryStr += '\nFROM ' + objectName + ' WHERE Id=\'' + recId + '\''; 
            
            SObject obj = Database.query(queryStr);
            
            Map<String, Object>respMap = new Map<String, Object>();
            respMap.put('outcomeField', obj.get(outcomeField));
            if (paramMap.get('section1Field') != null) respMap.put('section1Field', obj.get(paramMap.get('section1Field')));
            if (paramMap.get('section2Field') != null) respMap.put('section2Field', obj.get(paramMap.get('section2Field')));        
            
            resp.data = respMap;
        }
        catch (exception e)
        {
            resp.status = PSResponse.ERROR;
            resp.msg = e.getMessage();
        }
        
        return  JSON.serialize(resp);
    }
}