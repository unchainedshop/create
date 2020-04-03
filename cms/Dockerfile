FROM agentejo/cockpit:0.10.0

# Download & Install GetCockpit Addons
# ADD https://github.com/agentejo/SimpleResponseCache/archive/master.zip SimpleResponseCache.zip
ADD https://github.com/agentejo/LayoutComponents/archive/master.zip LayoutComponents.zip
ADD https://github.com/agentejo/Lokalize/archive/master.zip Lokalize.zip
ADD https://github.com/agentejo/CockpitQL/archive/master.zip CockpitQL.zip
ADD https://github.com/agentejo/cockpit-i18n/archive/master.zip cockpit-i18n.zip
RUN unzip Lokalize.zip -d addons && mv addons/Lokalize-master addons/Lokalize
# RUN unzip SimpleResponseCache.zip -d addons && mv addons/SimpleResponseCache-master addons/SimpleResponseCache
RUN unzip LayoutComponents.zip -d addons && mv addons/LayoutComponents-master addons/LayoutComponents
RUN unzip Lokalize.zip -d addons && mv addons/Lokalize-master addons/Lokalize
RUN unzip CockpitQL.zip -d addons && mv addons/CockpitQL-master addons/CockpitQL
RUN unzip cockpit-i18n.zip -d . && mv cockpit-i18n-master ./config/i18n

# Configure
COPY config.yaml /var/www/html/config/config.yaml
RUN rm /var/www/html/config/config.php
RUN chmod 777 /var/www/html/config/config.yaml
