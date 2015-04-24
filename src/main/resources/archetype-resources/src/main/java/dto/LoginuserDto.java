package ${package}.dto;

import jp.furplag.sastruts.extension.dto.OriginuserDto;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.seasar.framework.container.annotation.tiger.Component;
import org.seasar.framework.container.annotation.tiger.InstanceType;

import statics.jp.furplag.sastruts.extension.util.WebclientUtils;

@Component(instance = InstanceType.SESSION)
public class LoginuserDto implements OriginuserDto {

  private static final long serialVersionUID = 0L;

  public String id;

  public final String os;

  public final String category;

  public final String browserName;

  public final double browserVersion;

  public final boolean jqueryLegacy;

  public LoginuserDto() {
    os = WebclientUtils.getOS();
    category = WebclientUtils.getCategory();
    browserName = WebclientUtils.getBrowser();
    browserVersion = WebclientUtils.getVersionNumber();
    jqueryLegacy = WebclientUtils.isJqueryLegacy();

    final Log log = LogFactory.getLog(LoginuserDto.class);
    log.warn("jp.furplag.web.immortal.dto.LoginuserDto is not specified yet.");
  }

  public String getOs() {
    return os;
  }

  public String getCategory() {
    return category;
  }

  public String getBrowserName() {
    return browserName;
  }

  public double getBrowserVersion() {
    return browserVersion;
  }

  public boolean isJqueryLegacy() {
    return jqueryLegacy;
  }

  @Override
  public boolean isAuthenticated() {
    return false;
  }

  @Override
  public boolean isConfigurable() {
    return false;
  }

  @Override
  public boolean isAdministrable() {
    return false;
  }
}
