import SEO from "components/seo";
import { Flex, Text } from "@chakra-ui/react";
import privacyStyles from "styles/privacy";
// import { BetaAnalyticsDataClient } from "@google-analytics/data";

function Privacypolicy() {
  return (
    <Flex>
      <SEO
        title="Candid Reviews - Privacy Policy"
        description="This page contains the privacy policy of the Candid Reviews App. By downloading the app, you are accepting candid reviews privacy policy."
      />
      <Flex sx={privacyStyles.container}>
        <Text sx={privacyStyles.heading}>Privacy Policy</Text>
        <Flex sx={privacyStyles.subContainer}>
          <p>
            Mish Fit built the Candid Reviews app as a Free app. This SERVICE is
            provided by Mish Fit at no cost and is intended for use as is. This
            page is used to inform visitors regarding my policies with the
            collection, use, and disclosure of Personal Information if anyone
            decided to use my Service. If you choose to use our Services, then
            you agree to the collection and use of information in relation to
            this policy. The Personal Information that I collect is used for
            providing and improving the Service. I will not use or share your
            information with anyone except as described in this Privacy Policy.
            The terms used in this Privacy Policy have the same meanings as in
            our Terms and Conditions, which is accessible at Candid unless
            otherwise defined in this Privacy Policy.
            <b>
              <br />
              <br />
              Information Collection and Use
              <br />
            </b>
            For a better experience, while using our Service, I may require you
            to provide us with certain personally identifiable information,
            including but not limited to Email, Phone Number. The information
            that I request will be retained on your device and is not collected
            by me in any way.The app does use third party services that may
            collect information used to identify you.
            <b>
              <br />
              <br />
              Link to privacy policy of third party service providers used by
              the app
              <br />
            </b>
            <br />
            1.Google Play Services
            <br />
            2.Amplitude Services
            <br />
            <br />I want to inform you that whenever you use my Service, in a
            case of an error in the app I collect data and information (through
            third party products) on your phone called Log Data. This Log Data
            may include information such as your device Internet Protocol (“IP”)
            address, device name, operating system version, the configuration of
            the app when utilizing my Service, the time and date of your use of
            the Service, and other statistics.
            <b>
              <br />
              <br />
              Cookies
              <br />
            </b>
            Cookies are files with a small amount of data that are commonly used
            as anonymous unique identifiers. These are sent to your browser from
            the websites that you visit and are stored on your devices internal
            memory. This Service does not use these “cookies” explicitly.
            However, the app may use third party code and libraries that use
            “cookies” to collect information and improve their services. You
            have the option to either accept or refuse these cookies and know
            when a cookie is being sent to your device. If you choose to refuse
            our cookies, you may not be able to use some portions of this
            Service.
            <b>
              <br />
              <br />
              Service Providers
              <br />
            </b>
            We may employ third-party companies and individuals due to the
            following reasons:
            <br />
            1.To facilitate our Service
            <br />
            2.To provide the Service on our behalf
            <br />
            3.To perform Service-related services or
            <br />
            4.To assist us in analyzing how our Service is used
            <br />
            <br />
            We want to inform users of this Service that these third parties
            have access to your Personal Information. The reason is to perform
            the tasks assigned to them on our behalf. However, they are
            obligated not to disclose or use the information for any other
            purpose.
            <b>
              <br />
              <br />
              Security
              <br />
            </b>
            We value your trust in providing us your Personal Information, thus
            we are striving to use commercially acceptable means of protecting
            it. But remember that no method of transmission over the internet,
            or method of electronic storage is 100% secure and reliable, and we
            cannot guarantee its absolute security.
            <b>
              <br />
              <br />
              Links to Other Sites
              <br />
            </b>
            This Service may contain links to other sites. If you click on a
            third-party link, you will be directed to that site. Note that these
            external sites are not operated by us. Therefore, We strongly advise
            you to review the Privacy Policy of these websites. We have no
            control over and assume no responsibility for the content, privacy
            policies, or practices of any third-party sites or services.
            <b>
              <br />
              <br />
              Children’s Privacy
              <br />
            </b>
            These Services do not address anyone under the age of 13. We do not
            knowingly collect personally identifiable information from children
            under 13 years of age. In the case we discover that a child under 13
            has provided me with personal information, we immediately delete
            this from our servers. If you are a parent or guardian and you are
            aware that your child has provided us with personal information,
            please contact us at help@cndd.in so that we are able to do take
            necessary actions.
            <b>
              <br />
              <br />
              Changes to This Privacy Policy
              <br />
            </b>
            We may update our Privacy Policy from time to time. Thus, you are
            advised to review this page periodically for any changes. We will
            notify you of any changes by posting the new Privacy Policy on this
            page. This policy is effective as of 2022-01-01
            <b>
              <br />
              <br />
              Contact Us
              <br />
            </b>
            If you have any questions or suggestions about this Privacy Policy,
            do not hesitate to contact us at hello@cndd.in
          </p>
        </Flex>
      </Flex>
    </Flex>
  );
}

// export async function getServerSideProps(context) {
//   const analyticsDataClient = new BetaAnalyticsDataClient();

//   try {
//     const [linkResponse] = await analyticsDataClient.runReport({
//       property: `properties/307191351`,
//       dateRanges: [
//         {
//           startDate: "2022-03-01",
//           endDate: "today",
//         },
//       ],
//       dimensions: [
//         {
//           name: "customEvent:u_id",
//         },
//         {
//           name: "customEvent:bucket",
//         },
//         {
//           name: "customEvent:title",
//         },
//         {
//           name: "customEvent:font_color",
//         },
//         {
//           name: "customEvent:shadow_color",
//         },
//         {
//           name: "eventName",
//         },
//       ],
//       metrics: [
//         {
//           name: "eventCount",
//         },
//       ],
//       dimensionFilter: {
//         andGroup: {
//           expressions: [
//             {
//               filter: {
//                 fieldName: "eventName",
//                 inListFilter: {
//                   values: ["LINK_CLICK", "LINK_EXTENSION"],
//                 },
//               },
//             },
//             {
//               notExpression: {
//                 filter: {
//                   fieldName: "customEvent:u_id",
//                   stringFilter: {
//                     value: "(not set)",
//                   },
//                 },
//               },
//             },
//           ],
//         },
//       },
//       limit: "100000",
//     });

//     console.log(linkResponse);
//   } catch (e) {
//     console.log("LINK REPORT error", e);
//   }

//   return {
//     props: {},
//   };
// }

export default Privacypolicy;
