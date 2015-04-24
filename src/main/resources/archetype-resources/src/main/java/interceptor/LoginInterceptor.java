package ${package}.interceptor;

import java.lang.reflect.Method;

import javax.annotation.Resource;

import jp.furplag.sastruts.extension.interceptor.AbstractLoginInterceptor;
import jp.furplag.sastruts.extension.persistence.LinearResponse;
import jp.furplag.sastruts.extension.persistence.Logging;

import org.aopalliance.intercept.MethodInvocation;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts.action.ActionMessage;
import org.apache.struts.action.ActionMessages;
import org.seasar.struts.annotation.Execute;
import org.seasar.struts.util.ActionMessagesUtil;
import org.seasar.struts.util.RequestUtil;

import statics.jp.furplag.sastruts.extension.util.ResourceUtils;

import ${package}.dto.LoginuserDto;

public class LoginInterceptor extends AbstractLoginInterceptor {

  private static final long serialVersionUID = 0L;

  @Resource
  protected LoginuserDto loginuserDto;

  @Override
  public Object invoke(MethodInvocation invocation) throws Throwable {

    Method method = invocation.getMethod();
    if (method.isAnnotationPresent(Execute.class) && !method.isAnnotationPresent(jp.furplag.sastruts.extension.persistence.Anonymous.class)) {
      ActionMessages messages = new ActionMessages();
      if (loginuserDto == null) {
        messages.add(ActionMessages.GLOBAL_MESSAGE, new ActionMessage(ResourceUtils.getProp("interceptor", "errors.timeout"), false));
      } else if (!loginuserDto.isAuthenticated()) {
        messages.add(ActionMessages.GLOBAL_MESSAGE, new ActionMessage(ResourceUtils.getProp("interceptor", "errors.auth"), false));
      }
      if (messages.size() < 1 && method.isAnnotationPresent(jp.furplag.sastruts.extension.persistence.Admin.class) && !loginuserDto.isAdministrable()) messages.add(ActionMessages.GLOBAL_MESSAGE, new ActionMessage("errors.permission.admin"));
      if (messages.size() < 1 && method.isAnnotationPresent(jp.furplag.sastruts.extension.persistence.Config.class) && !loginuserDto.isConfigurable()) messages.add(ActionMessages.GLOBAL_MESSAGE, new ActionMessage("errors.permission.config"));
      if (messages.size() > 0) {
        ActionMessagesUtil.addErrors(RequestUtil.getRequest().getSession(), messages);
        return method.isAnnotationPresent(LinearResponse.class) ? "/fatal/linear?redirect=true" : "/fatal/?redirect=true";
      }
    }
    final Log log = LogFactory.getLog(getTargetClass(invocation));
    final long start = System.currentTimeMillis();
    if (method.isAnnotationPresent(Execute.class)) log.info("START " + getTargetClass(invocation).getSimpleName() + "#" + invocation.getMethod().getName());
    Object ret = invocation.proceed();
    if (method.isAnnotationPresent(Execute.class)) log.info("END " + getTargetClass(invocation).getSimpleName() + "#" + invocation.getMethod().getName()+ " - " + (System.currentTimeMillis() - start) + "msec.");
    if (method.isAnnotationPresent(Logging.class)) logging(method);

    return ret;
  }

  @Override
  public void logging(Method method) {
    System.out.println(method);
  }
}
