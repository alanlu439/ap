const practiceData = window.APPracticeData;
const selectedPracticeSubject = practiceData?.getSelectedSubject?.() || {
  title: "AP Statistics",
  short: "AP Statistics",
  slug: "ap-statistics",
  format: { mcqCount: 40, mcqMinutes: 90, frqCount: 6, frqMinutes: 90, mcqWeight: 50, frqWeight: 50, fullMinutes: 180 }
};
const UNIT_FOCUS = practiceData?.getUnitFilter?.(selectedPracticeSubject) || "";
let TOTAL_SECONDS = selectedPracticeSubject.format.mcqMinutes * 60;
let STORAGE_KEY = practiceData?.storageKey?.("mcq", selectedPracticeSubject, UNIT_FOCUS) || "ap-practice-" + selectedPracticeSubject.slug + "-mcq-state-v1";

const statsSkillLabels = {
  1: "Skill 1: Selecting Statistical Methods",
  2: "Skill 2: Data Analysis",
  3: "Skill 3: Using Probability and Simulation",
  4: "Skill 4: Statistical Argumentation"
};
const skillLabels = selectedPracticeSubject.title === "AP Statistics" ? statsSkillLabels : practiceData?.skillLabels || statsSkillLabels;

const statsQuestions = [
  {
    id: 1,
    unit: "Unit 1: Exploring One-Variable Data",
    skill: 2,
    stimulus: "A random sample of 12 commute times, in minutes, for students at a large high school is shown.\n18, 21, 24, 25, 26, 28, 31, 33, 36, 39, 42, 69",
    prompt: "Which description best summarizes the shape and unusual features of the distribution?",
    choices: [
      "Approximately symmetric with no clear outliers",
      "Left-skewed with a low outlier",
      "Right-skewed with a possible high outlier",
      "Uniform with no gaps",
      "Bimodal with one cluster near 25 and one near 69"
    ],
    correct: 2,
    explanation: "Most values are between 18 and 42, with one much larger value, 69. A long right tail and a possible high outlier make the distribution right-skewed."
  },
  {
    id: 2,
    unit: "Unit 1: Exploring One-Variable Data",
    skill: 2,
    stimulus: "A random sample of 12 commute times, in minutes, for students at a large high school is shown.\n18, 21, 24, 25, 26, 28, 31, 33, 36, 39, 42, 69",
    prompt: "Using the median-of-halves method, what is the interquartile range of the commute times?",
    choices: [
      "12.0 minutes",
      "13.0 minutes",
      "14.5 minutes",
      "18.0 minutes",
      "44.5 minutes"
    ],
    correct: 1,
    explanation: "The lower half is 18, 21, 24, 25, 26, 28, so Q1 = (24 + 25) / 2 = 24.5. The upper half is 31, 33, 36, 39, 42, 69, so Q3 = (36 + 39) / 2 = 37.5. The IQR is 37.5 - 24.5 = 13.0."
  },
  {
    id: 3,
    unit: "Unit 1: Exploring One-Variable Data",
    skill: 4,
    stimulus: "A random sample of 12 commute times, in minutes, for students at a large high school is shown.\n18, 21, 24, 25, 26, 28, 31, 33, 36, 39, 42, 69",
    prompt: "Which pair of summary statistics is most appropriate for describing the center and variability of these commute times?",
    choices: [
      "Mean and standard deviation, because the distribution is right-skewed",
      "Mean and IQR, because the mean resists outliers",
      "Median and standard deviation, because the standard deviation resists outliers",
      "Median and IQR, because the distribution is skewed with a possible outlier",
      "Range and standard deviation, because the data are quantitative"
    ],
    correct: 3,
    explanation: "For skewed distributions or distributions with outliers, the median and IQR are preferred because both are resistant to extreme values."
  },
  {
    id: 4,
    unit: "Unit 1: Exploring One-Variable Data",
    skill: 2,
    prompt: "A student's score on a test has a z-score of 1.25. If the class mean is 72 and the standard deviation is 8, what was the student's score?",
    choices: [
      "62",
      "73.25",
      "80",
      "82",
      "90"
    ],
    correct: 3,
    explanation: "A z-score is (value - mean) / standard deviation. The score is 72 + 1.25(8) = 82."
  },
  {
    id: 5,
    unit: "Unit 1: Exploring One-Variable Data",
    skill: 2,
    prompt: "Two boxplots compare quiz scores for Group A and Group B. Group A has median 78 and IQR 12. Group B has median 82 and IQR 8. Which conclusion is supported?",
    choices: [
      "Group A has a higher typical score and less variability in the middle half.",
      "Group B has a higher typical score and less variability in the middle half.",
      "Group B has a lower typical score and greater variability in the middle half.",
      "The groups must have the same mean because both are quiz scores.",
      "The maximum score must be larger in Group A because its IQR is larger."
    ],
    correct: 1,
    explanation: "The median measures typical value, and Group B's median is higher. The IQR measures spread in the middle 50%, and Group B's IQR is smaller."
  },
  {
    id: 6,
    unit: "Unit 1: Exploring One-Variable Data",
    skill: 2,
    prompt: "Suppose the heights of a large population are approximately normal with mean 64 inches and standard deviation 6 inches. Approximately what percent of heights are between 58 and 76 inches?",
    choices: [
      "47.7%",
      "68.2%",
      "81.9%",
      "95.0%",
      "97.7%"
    ],
    correct: 2,
    explanation: "The z-scores are (58 - 64) / 6 = -1 and (76 - 64) / 6 = 2. The area between z = -1 and z = 2 is about 0.9772 - 0.1587 = 0.8185."
  },
  {
    id: 7,
    unit: "Unit 1: Exploring One-Variable Data",
    skill: 4,
    prompt: "A student says, \"The mean is larger than the median, so the distribution must be left-skewed.\" Which response is best?",
    choices: [
      "The statement is correct because the mean is always pulled toward smaller values.",
      "The statement is correct only if the standard deviation is small.",
      "The statement is backwards; a mean larger than the median suggests right-skew.",
      "The statement proves the distribution is normal.",
      "The statement proves the distribution has no outliers."
    ],
    correct: 2,
    explanation: "The mean is pulled toward the long tail or extreme values. If the mean is larger than the median, that suggests a right tail, not a left tail."
  },
  {
    id: 8,
    unit: "Unit 1: Exploring One-Variable Data",
    skill: 2,
    prompt: "Every value in a data set is multiplied by 3 and then 5 is added. How do the mean and standard deviation change?",
    choices: [
      "The mean is multiplied by 3 and then 5 is added; the standard deviation is multiplied by 3.",
      "The mean is multiplied by 3; the standard deviation is multiplied by 3 and then 5 is added.",
      "Both the mean and standard deviation are multiplied by 3 and then 5 is added.",
      "The mean is increased by 5; the standard deviation is unchanged.",
      "Both the mean and standard deviation are unchanged because z-scores are unchanged."
    ],
    correct: 0,
    explanation: "Multiplying all values by 3 multiplies both the mean and standard deviation by 3. Adding 5 shifts the mean by 5 but does not change spread."
  },
  {
    id: 9,
    unit: "Unit 2: Exploring Two-Variable Data",
    skill: 2,
    stimulus: "A least-squares regression line for predicting exam score from hours studied is y-hat = 62 + 4.3x, where x is hours studied.",
    prompt: "Which is the best interpretation of the slope?",
    choices: [
      "For each additional hour studied, the predicted exam score increases by about 4.3 points.",
      "For each additional point on the exam, the predicted study time increases by about 4.3 hours.",
      "A student who studies 0 hours is guaranteed to score 62.",
      "The correlation between hours studied and exam score is 4.3.",
      "The average exam score is 4.3 points."
    ],
    correct: 0,
    explanation: "The slope gives the predicted change in y for a 1-unit increase in x. Here, y is exam score and x is hours studied."
  },
  {
    id: 10,
    unit: "Unit 2: Exploring Two-Variable Data",
    skill: 2,
    stimulus: "A least-squares regression line for predicting exam score from hours studied is y-hat = 62 + 4.3x, where x is hours studied.",
    prompt: "A student who studied 5 hours scored 80. What is the residual for this student?",
    choices: [
      "-3.5",
      "3.5",
      "18.0",
      "21.5",
      "83.5"
    ],
    correct: 0,
    explanation: "The predicted score is 62 + 4.3(5) = 83.5. Residual = observed - predicted = 80 - 83.5 = -3.5."
  },
  {
    id: 11,
    unit: "Unit 3: Collecting Data",
    skill: 1,
    prompt: "A principal wants to estimate the proportion of all students at a school who have a part-time job. Which method is most likely to produce an unbiased estimate?",
    choices: [
      "Ask the first 100 students who enter the cafeteria.",
      "Post an online poll and use all submitted responses.",
      "Take a simple random sample from a list of all enrolled students.",
      "Ask only students in senior English classes.",
      "Ask students who are already known to have jobs."
    ],
    correct: 2,
    explanation: "A simple random sample from a complete roster gives every student a known and equal chance of selection, reducing selection bias."
  },
  {
    id: 12,
    unit: "Unit 3: Collecting Data",
    skill: 1,
    stimulus: "A sleep app company wants to compare the effect of a caffeinated drink with a placebo drink on reaction time. Sixty volunteers agree to participate.",
    prompt: "Which design gives the strongest evidence that any difference in reaction time is caused by the drink?",
    choices: [
      "Let each volunteer choose which drink to consume.",
      "Give caffeine to the 30 youngest volunteers and placebo to the 30 oldest volunteers.",
      "Randomly assign volunteers to caffeine or placebo, preferably with blinding.",
      "Give everyone caffeine, then compare reaction times with last month's national average.",
      "Ask volunteers whether they usually consume caffeine and compare the two groups."
    ],
    correct: 2,
    explanation: "Random assignment creates comparable treatment groups, and blinding helps reduce response and measurement bias. That combination supports cause-and-effect conclusions."
  },
  {
    id: 13,
    unit: "Unit 3: Collecting Data",
    skill: 4,
    stimulus: "A sleep app company wants to compare the effect of a caffeinated drink with a placebo drink on reaction time. Sixty volunteers agree to participate.",
    prompt: "What is the main purpose of random assignment in this experiment?",
    choices: [
      "To make the volunteers representative of all adults",
      "To guarantee that the sample size is large enough",
      "To balance potential confounding variables across the treatment groups",
      "To remove all natural variation from reaction times",
      "To make the response variable categorical"
    ],
    correct: 2,
    explanation: "Random assignment does not make volunteers representative of a population, but it helps distribute lurking variables roughly evenly among treatment groups."
  },
  {
    id: 14,
    unit: "Unit 3: Collecting Data",
    skill: 1,
    prompt: "A school emails all students a survey about cafeteria food and analyzes only the surveys that students choose to submit. Which bias is the biggest concern?",
    choices: [
      "Undercoverage because every student at the school was contacted",
      "Voluntary response bias because students with strong opinions may be more likely to respond",
      "Nonresponse bias because the population was too small",
      "Response bias because the survey is anonymous",
      "Sampling variability because all samples are biased"
    ],
    correct: 1,
    explanation: "When people choose whether to respond, those with strong opinions are often overrepresented. That is voluntary response bias."
  },
  {
    id: 15,
    unit: "Unit 3: Collecting Data",
    skill: 4,
    prompt: "A botanist compares two fertilizers by randomly assigning 5 fields to each fertilizer. The fields differ greatly in sunlight exposure. Which change would most improve the design?",
    choices: [
      "Use a voluntary sample of fields.",
      "Block fields by sunlight exposure, then randomly assign fertilizers within each block.",
      "Assign the new fertilizer to fields with the most sunlight.",
      "Use only one field and apply both fertilizers to the whole field.",
      "Remove random assignment so each farmer can choose a fertilizer."
    ],
    correct: 1,
    explanation: "Blocking on sunlight creates groups of similar fields before random assignment. This reduces variation from an important field characteristic."
  },
  {
    id: 16,
    unit: "Unit 4: Probability, Random Variables, and Probability Distributions",
    skill: 3,
    prompt: "For two events A and B, P(A) = 0.35, P(B) = 0.50, and P(A and B) = 0.20. What is P(A or B)?",
    choices: [
      "0.15",
      "0.20",
      "0.55",
      "0.65",
      "0.85"
    ],
    correct: 3,
    explanation: "Use the general addition rule: P(A or B) = P(A) + P(B) - P(A and B) = 0.35 + 0.50 - 0.20 = 0.65."
  },
  {
    id: 17,
    unit: "Unit 4: Probability, Random Variables, and Probability Distributions",
    skill: 3,
    prompt: "A disease affects 2% of a population. A test has sensitivity 0.95 and false-positive rate 0.08. If a randomly selected person tests positive, approximately what is the probability that the person has the disease?",
    choices: [
      "0.019",
      "0.080",
      "0.195",
      "0.570",
      "0.950"
    ],
    correct: 2,
    explanation: "P(disease and positive) = 0.02(0.95) = 0.019. P(positive) = 0.019 + 0.98(0.08) = 0.0974. The conditional probability is 0.019 / 0.0974, about 0.195."
  },
  {
    id: 18,
    unit: "Unit 4: Probability, Random Variables, and Probability Distributions",
    skill: 3,
    prompt: "A fair six-sided die is rolled until the first 6 occurs. What is the probability that the first 6 occurs on the third roll?",
    choices: [
      "1/216",
      "5/216",
      "25/216",
      "125/216",
      "1/6"
    ],
    correct: 2,
    explanation: "The first two rolls must not be 6 and the third roll must be 6: (5/6)(5/6)(1/6) = 25/216."
  },
  {
    id: 19,
    unit: "Unit 4: Probability, Random Variables, and Probability Distributions",
    skill: 3,
    prompt: "Let X be the number of successes in 20 independent trials, each with probability of success 0.30. What are the mean and standard deviation of X?",
    choices: [
      "Mean 0.30, standard deviation 0.46",
      "Mean 6, standard deviation 2.05",
      "Mean 6, standard deviation 4.20",
      "Mean 14, standard deviation 2.05",
      "Mean 20, standard deviation 6"
    ],
    correct: 1,
    explanation: "For a binomial random variable, mean = np = 20(0.30) = 6 and standard deviation = sqrt(np(1 - p)) = sqrt(20(0.30)(0.70)) = sqrt(4.2), about 2.05."
  },
  {
    id: 20,
    unit: "Unit 4: Probability, Random Variables, and Probability Distributions",
    skill: 3,
    stimulus: "At a bakery, croissant weights have mean 82 grams and standard deviation 5 grams. Muffin weights have mean 110 grams and standard deviation 8 grams. Assume the weights are independent.",
    prompt: "Let T = 2C + M, where C is the weight of a randomly selected croissant and M is the weight of a randomly selected muffin. Which pair gives the mean and standard deviation of T, approximately?",
    choices: [
      "Mean 274 grams, standard deviation 13 grams",
      "Mean 274 grams, standard deviation 18 grams",
      "Mean 192 grams, standard deviation 13 grams",
      "Mean 192 grams, standard deviation 18 grams",
      "Mean 274 grams, standard deviation 21 grams"
    ],
    correct: 0,
    explanation: "The mean is 2(82) + 110 = 274. The variance is 2^2(5^2) + 8^2 = 164, so the standard deviation is sqrt(164), about 12.8 grams."
  },
  {
    id: 21,
    unit: "Unit 4: Probability, Random Variables, and Probability Distributions",
    skill: 3,
    prompt: "A simulation will estimate the probability that a random group of 4 students includes at least one left-handed student, assuming 10% of students are left-handed. Which simulation method is appropriate?",
    choices: [
      "Generate one random digit per trial; let 0 represent at least one left-handed student.",
      "Generate four random digits per trial; let 0 represent a left-handed student; record whether at least one 0 appears.",
      "Generate ten random digits per trial; record whether exactly four 0s appear.",
      "Flip one fair coin four times; count heads as left-handed.",
      "Use the digits 0 through 9 but ignore all digits except 4."
    ],
    correct: 1,
    explanation: "Using one digit per student with one digit out of ten representing left-handed matches p = 0.10. Four digits represent four students in one trial."
  },
  {
    id: 22,
    unit: "Unit 5: Sampling Distributions",
    skill: 3,
    prompt: "For random samples of size 100 from a large population with true proportion p = 0.40, what are the mean and standard deviation of the sampling distribution of p-hat?",
    choices: [
      "Mean 0.40, standard deviation 0.0024",
      "Mean 0.40, standard deviation 0.049",
      "Mean 40, standard deviation 4.9",
      "Mean 0.60, standard deviation 0.049",
      "Mean 100, standard deviation 0.40"
    ],
    correct: 1,
    explanation: "The mean of p-hat is p = 0.40. The standard deviation is sqrt(p(1 - p) / n) = sqrt(0.40(0.60) / 100), about 0.049."
  },
  {
    id: 23,
    unit: "Unit 5: Sampling Distributions",
    skill: 3,
    prompt: "A population is strongly right-skewed with mean 120 and standard deviation 30. For random samples of size 50, which statement about the sampling distribution of x-bar is best?",
    choices: [
      "It is strongly right-skewed with mean 120 and standard deviation 30.",
      "It is approximately normal with mean 120 and standard deviation about 4.24.",
      "It is approximately normal with mean 50 and standard deviation 30.",
      "It has unknown mean because the population is skewed.",
      "It is exactly normal only if the population is exactly normal."
    ],
    correct: 1,
    explanation: "By the central limit theorem, the sampling distribution of x-bar is approximately normal for a large sample size. Its mean is 120 and standard deviation is 30 / sqrt(50), about 4.24."
  },
  {
    id: 24,
    unit: "Unit 5: Sampling Distributions",
    skill: 4,
    prompt: "A student takes a random sample of size 20 from a strongly skewed population and says the sampling distribution of x-bar is definitely normal because of the central limit theorem. What is the best response?",
    choices: [
      "The student is correct because any sample size larger than 10 guarantees normality.",
      "The student is correct only if the population standard deviation is known.",
      "The student is not necessarily correct because n = 20 may be too small for a strongly skewed population.",
      "The student is incorrect because the central limit theorem applies only to proportions.",
      "The student is incorrect because x-bar can never be approximately normal."
    ],
    correct: 2,
    explanation: "For strongly skewed populations, larger sample sizes are needed before the sampling distribution of x-bar is approximately normal. A sample size of 20 may not be enough."
  },
  {
    id: 25,
    unit: "Unit 5: Sampling Distributions",
    skill: 3,
    prompt: "Which condition is most directly used to justify a normal model for the sampling distribution of the difference between two independent sample proportions?",
    choices: [
      "Each sample must contain at least 30 observations, regardless of outcomes.",
      "The observed sample proportions must be equal.",
      "The expected counts of successes and failures in both groups should be sufficiently large.",
      "The two population proportions must add to 1.",
      "The sample means must be approximately equal."
    ],
    correct: 2,
    explanation: "A normal model for sample proportions is justified by sufficiently large expected counts of successes and failures in each group, often checked with at least 10 of each."
  },
  {
    id: 26,
    unit: "Unit 6: Inference for Categorical Data: Proportions",
    skill: 1,
    prompt: "A researcher wants to test whether more than half of all seniors at a high school plan to attend a four-year college. Which procedure is appropriate?",
    choices: [
      "One-sample z test for a proportion",
      "One-sample t test for a mean",
      "Two-sample z test for a difference in proportions",
      "Chi-square test for independence",
      "Linear regression t test for slope"
    ],
    correct: 0,
    explanation: "The parameter is one population proportion, and the alternative is p > 0.50, so a one-sample z test for a proportion is appropriate."
  },
  {
    id: 27,
    unit: "Unit 6: Inference for Categorical Data: Proportions",
    skill: 1,
    stimulus: "A random sample of 500 adults finds that 295 support a proposed policy. A researcher tests H0: p = 0.55 versus Ha: p > 0.55, where p is the true proportion of adults who support the policy.",
    prompt: "Which statement correctly checks the large-counts condition for the test?",
    choices: [
      "The condition is met because 295 and 205 are both at least 10.",
      "The condition is met because 500(0.55) and 500(0.45) are both at least 10.",
      "The condition is not met because p-hat is not equal to 0.55.",
      "The condition is not met because the sample is less than 10% of the population.",
      "The condition cannot be checked for a one-sample proportion test."
    ],
    correct: 1,
    explanation: "For a one-sample z test for a proportion, large counts are checked using the null value: np0 = 500(0.55) = 275 and n(1 - p0) = 225, both at least 10."
  },
  {
    id: 28,
    unit: "Unit 6: Inference for Categorical Data: Proportions",
    skill: 3,
    stimulus: "A random sample of 500 adults finds that 295 support a proposed policy. A researcher tests H0: p = 0.55 versus Ha: p > 0.55, where p is the true proportion of adults who support the policy.",
    prompt: "The sample proportion is 0.59. What is the approximate test statistic and p-value?",
    choices: [
      "z = 0.04, p-value = 0.484",
      "z = 0.90, p-value = 0.184",
      "z = 1.80, p-value = 0.036",
      "z = 3.60, p-value < 0.001",
      "z = -1.80, p-value = 0.964"
    ],
    correct: 2,
    explanation: "The standard error under H0 is sqrt(0.55(0.45)/500), about 0.02225. The statistic is (0.59 - 0.55) / 0.02225, about 1.80. For Ha: p > 0.55, the p-value is about 0.036."
  },
  {
    id: 29,
    unit: "Unit 6: Inference for Categorical Data: Proportions",
    skill: 3,
    stimulus: "A random sample of 500 adults finds that 295 support a proposed policy. A researcher tests H0: p = 0.55 versus Ha: p > 0.55, where p is the true proportion of adults who support the policy.",
    prompt: "Which interpretation of the p-value is correct?",
    choices: [
      "There is a 0.036 probability that the null hypothesis is true.",
      "There is a 0.036 probability that the sample result was caused by bias.",
      "If the true support proportion is 0.55, there is about a 0.036 probability of getting a sample proportion of 0.59 or larger in a sample of 500.",
      "If the true support proportion is 0.59, there is about a 0.036 probability of getting a sample proportion of 0.55 or smaller.",
      "The probability that the true support proportion is greater than 0.55 is 0.964."
    ],
    correct: 2,
    explanation: "A p-value is calculated assuming the null hypothesis is true and measures the probability of a result at least as extreme as the observed result in the direction of the alternative."
  },
  {
    id: 30,
    unit: "Unit 6: Inference for Categorical Data: Proportions",
    skill: 4,
    prompt: "A 95% confidence interval for the proportion of all voters in a city who support a ballot measure is (0.41, 0.49). Which conclusion is most appropriate?",
    choices: [
      "There is a 95% chance that the sample proportion is between 0.41 and 0.49.",
      "The interval provides evidence that the population proportion is less than 0.50.",
      "The population proportion must be exactly the midpoint of the interval.",
      "The interval proves that 95% of individuals have the characteristic.",
      "No conclusion can be made because 0.50 is close to the interval."
    ],
    correct: 1,
    explanation: "Because 0.50 is not in the 95% confidence interval and all plausible values are below 0.50, the interval provides evidence that the population proportion is less than 0.50."
  },
  {
    id: 31,
    unit: "Unit 7: Inference for Quantitative Data: Means",
    skill: 1,
    prompt: "Ten runners record their mile times before and after a training program. The researcher wants to test whether the program decreases mean mile time. Which procedure is appropriate?",
    choices: [
      "One-sample z test for a proportion",
      "Two-sample z test for a difference in proportions",
      "Paired t test for the mean difference in mile times",
      "Two-sample t test for independent means",
      "Chi-square goodness-of-fit test"
    ],
    correct: 2,
    explanation: "The same runners are measured before and after training, so the data are paired. Analyze the differences with a paired t test."
  },
  {
    id: 32,
    unit: "Unit 7: Inference for Quantitative Data: Means",
    skill: 4,
    prompt: "For paired data, a 90% confidence interval for the mean difference after - before is (-4.2, -1.1) seconds. Which interpretation is correct?",
    choices: [
      "We are 90% confident that each runner improved by between 1.1 and 4.2 seconds.",
      "We are 90% confident that the mean after time is between 1.1 and 4.2 seconds lower than the mean before time.",
      "There is a 90% chance that the true mean difference is in this fixed interval.",
      "The training program has no effect because the interval includes negative values.",
      "The sample mean difference is exactly -4.2 seconds."
    ],
    correct: 1,
    explanation: "Since the interval for after - before is entirely negative, it suggests the mean after time is lower. Confidence is about the method, not a probability that this fixed interval contains the parameter."
  },
  {
    id: 33,
    unit: "Unit 7: Inference for Quantitative Data: Means",
    skill: 3,
    prompt: "A random sample of 16 observations has x-bar = 52 and s = 8. Assuming conditions are met, which is the approximate 95% confidence interval for the population mean?",
    choices: [
      "(48.0, 56.0)",
      "(47.7, 56.3)",
      "(43.5, 60.5)",
      "(50.0, 54.0)",
      "(36.0, 68.0)"
    ],
    correct: 1,
    explanation: "Use t* with 15 degrees of freedom, about 2.131. The margin of error is 2.131(8 / sqrt(16)) = 4.262. The interval is about 52 +/- 4.262, or (47.7, 56.3)."
  },
  {
    id: 34,
    unit: "Unit 7: Inference for Quantitative Data: Means",
    skill: 1,
    stimulus: "A district compares mean SAT math scores for students in two independent tutoring programs. Program A has 35 randomly selected students. Program B has 40 randomly selected students. The population standard deviations are unknown.",
    prompt: "Which procedure is most appropriate for estimating the difference in mean scores, mu_A - mu_B?",
    choices: [
      "One-sample t interval for a mean",
      "Paired t interval for a mean difference",
      "Two-sample t interval for a difference in means",
      "Two-sample z interval for a difference in proportions",
      "Chi-square test for independence"
    ],
    correct: 2,
    explanation: "The groups are independent, the response is quantitative, and population standard deviations are unknown. A two-sample t interval is appropriate."
  },
  {
    id: 35,
    unit: "Unit 7: Inference for Quantitative Data: Means",
    skill: 3,
    stimulus: "A district compares mean SAT math scores for students in two independent tutoring programs. Program A has 35 randomly selected students. Program B has 40 randomly selected students. The population standard deviations are unknown.",
    prompt: "Why is a t procedure used instead of a z procedure?",
    choices: [
      "The response variable is categorical.",
      "The samples are paired.",
      "The population standard deviations are unknown and are estimated with sample standard deviations.",
      "The sample sizes are too large for z procedures.",
      "The null hypothesis contains a proportion."
    ],
    correct: 2,
    explanation: "For inference about means, z procedures require known population standard deviations. When they are unknown and estimated with sample standard deviations, t procedures are used."
  },
  {
    id: 36,
    unit: "Unit 7: Inference for Quantitative Data: Means",
    skill: 4,
    prompt: "A test of H0: mu = 100 versus Ha: mu < 100 gives p-value = 0.08. At significance level alpha = 0.05, which conclusion is best?",
    choices: [
      "Reject H0 because 0.08 is greater than 0.05.",
      "Reject H0 because the null hypothesis is probably false.",
      "Fail to reject H0; there is not convincing evidence that mu is less than 100.",
      "Fail to reject H0; this proves mu = 100.",
      "Accept Ha because the p-value is positive."
    ],
    correct: 2,
    explanation: "Since p-value = 0.08 is greater than alpha = 0.05, fail to reject H0. The data do not provide convincing evidence for the alternative."
  },
  {
    id: 37,
    unit: "Unit 8: Inference for Categorical Data: Chi-Square",
    skill: 1,
    prompt: "A researcher wants to test whether the distribution of favorite music genres among students at a school differs from published national percentages. Which procedure is appropriate?",
    choices: [
      "Chi-square goodness-of-fit test",
      "Chi-square test of independence",
      "One-sample t test for a mean",
      "Two-sample z test for a difference in proportions",
      "Linear regression t test for slope"
    ],
    correct: 0,
    explanation: "One categorical variable is being compared to a specified distribution of proportions, so a chi-square goodness-of-fit test is appropriate."
  },
  {
    id: 38,
    unit: "Unit 8: Inference for Categorical Data: Chi-Square",
    skill: 4,
    stimulus: "A two-way table classifies 200 students by grade level and whether they participate in an after-school activity. For the senior-and-participates cell, the row total is 80, the column total is 50, and the observed count is 28.",
    prompt: "For a chi-square test of independence, what is this cell's contribution to the chi-square statistic?",
    choices: [
      "0.40",
      "1.60",
      "3.20",
      "8.00",
      "20.00"
    ],
    correct: 2,
    explanation: "Expected count = (80)(50) / 200 = 20. The contribution is (observed - expected)^2 / expected = (28 - 20)^2 / 20 = 3.20."
  },
  {
    id: 39,
    unit: "Unit 9: Inference for Quantitative Data: Slopes",
    skill: 4,
    stimulus: "A least-squares regression is used to predict plant growth from hours of light. Computer output for the slope gives estimate = 2.80, standard error = 0.90, and df = 18.",
    prompt: "For testing H0: beta = 0 versus Ha: beta > 0, which conclusion is best at alpha = 0.05?",
    choices: [
      "There is convincing evidence of a positive linear relationship because t is about 3.11 and the one-sided p-value is small.",
      "There is no evidence of a positive linear relationship because the slope estimate is not 0.",
      "There is convincing evidence of a negative linear relationship because the standard error is positive.",
      "The test cannot be performed because df = 18 is less than 30.",
      "The conclusion must be based on the correlation, not the slope."
    ],
    correct: 0,
    explanation: "The test statistic is t = 2.80 / 0.90, about 3.11. With 18 degrees of freedom, the one-sided p-value is less than 0.05, giving evidence of a positive slope."
  },
  {
    id: 40,
    unit: "Unit 9: Inference for Quantitative Data: Slopes",
    skill: 4,
    stimulus: "A least-squares regression is used to predict plant growth from hours of light. Computer output for the slope gives estimate = 2.80, standard error = 0.90, and df = 18.",
    prompt: "A 95% confidence interval for the true slope is (0.7, 4.9). Which interpretation is correct?",
    choices: [
      "For every additional hour of light, the plant's actual growth increases by between 0.7 and 4.9 units.",
      "For every additional hour of light, the mean plant growth is estimated to increase by between 0.7 and 4.9 units, on average.",
      "The true slope is 2.80 with probability 0.95.",
      "The regression line explains 95% of the variation in growth.",
      "Because the interval is positive, the intercept must also be positive."
    ],
    correct: 1,
    explanation: "A slope interval describes the average change in the mean response for each 1-unit increase in the explanatory variable. Since the interval is entirely positive, it supports a positive linear association."
  }
];

const officialUnitRanges = {
  "Unit 1": "15%-23%",
  "Unit 2": "5%-7%",
  "Unit 3": "12%-15%",
  "Unit 4": "10%-20%",
  "Unit 5": "7%-12%",
  "Unit 6": "12%-15%",
  "Unit 7": "10%-18%",
  "Unit 8": "2%-5%",
  "Unit 9": "2%-5%"
};

const allQuestions = practiceData?.buildMcqQuestions?.(selectedPracticeSubject) || statsQuestions;
const scopedQuestions = practiceData?.filterItemsByUnit?.(allQuestions, UNIT_FOCUS) || allQuestions;
const questions = scopedQuestions.length ? scopedQuestions : allQuestions;
if (UNIT_FOCUS && selectedPracticeSubject.format.mcqCount) {
  TOTAL_SECONDS = Math.max(5 * 60, Math.round(selectedPracticeSubject.format.mcqMinutes * 60 * (questions.length / selectedPracticeSubject.format.mcqCount)));
}
STORAGE_KEY = practiceData?.storageKey?.("mcq", selectedPracticeSubject, UNIT_FOCUS) || STORAGE_KEY;

let state = loadState();
let timerHandle = null;

const els = {
  timer: document.getElementById("timer"),
  progressText: document.getElementById("progressText"),
  scoreText: document.getElementById("scoreText"),
  questionNumber: document.getElementById("questionNumber"),
  setLabel: document.getElementById("setLabel"),
  stimulus: document.getElementById("stimulus"),
  questionText: document.getElementById("questionText"),
  choices: document.getElementById("choices"),
  prevBtn: document.getElementById("prevBtn"),
  nextBtn: document.getElementById("nextBtn"),
  flagBtn: document.getElementById("flagBtn"),
  guessBtn: document.getElementById("guessBtn"),
  clearBtn: document.getElementById("clearBtn"),
  startBtn: document.getElementById("startBtn"),
  submitBtn: document.getElementById("submitBtn"),
  resetBtn: document.getElementById("resetBtn"),
  mcqProgressBar: document.getElementById("mcqProgressBar"),
  navigator: document.getElementById("navigator"),
  answeredText: document.getElementById("answeredText"),
  reviewPanel: document.getElementById("reviewPanel"),
  reviewStatus: document.getElementById("reviewStatus"),
  reviewTitle: document.getElementById("reviewTitle"),
  reviewExplanation: document.getElementById("reviewExplanation"),
  reviewTags: document.getElementById("reviewTags"),
  reviewFilter: document.getElementById("reviewFilter"),
  reviewList: document.getElementById("reviewList"),
  printSummaryBtn: document.getElementById("printSummaryBtn"),
  blueprintList: document.getElementById("blueprintList")
};

function defaultState() {
  return {
    current: 0,
    answers: Array(questions.length).fill(null),
    flagged: Array(questions.length).fill(false),
    guessed: Array(questions.length).fill(false),
    started: false,
    submitted: false,
    remaining: TOTAL_SECONDS,
    lastTick: null,
    score: null
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const saved = JSON.parse(raw);
    if (!saved || !Array.isArray(saved.answers) || saved.answers.length !== questions.length) {
      return defaultState();
    }
    return {
      ...defaultState(),
      ...saved,
      flagged: Array.isArray(saved.flagged) ? saved.flagged : Array(questions.length).fill(false),
      guessed: Array.isArray(saved.guessed) ? saved.guessed : Array(questions.length).fill(false)
    };
  } catch {
    return defaultState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function formatTime(seconds) {
  const clamped = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(clamped / 60);
  const secs = clamped % 60;
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatText(value) {
  return escapeHtml(value).replaceAll("\n", "<br>");
}

function oneParagraph(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function questionPrompt(question) {
  const stimulus = oneParagraph(question.stimulus);
  const prompt = oneParagraph(question.prompt);
  if (stimulus && prompt) {
    const separator = /[.!?]$/.test(stimulus) ? " " : ". ";
    return stimulus + separator + prompt;
  }
  return prompt || stimulus;
}

function answerChoiceExplanation(question, index) {
  if (Array.isArray(question.choiceExplanations) && question.choiceExplanations[index]) {
    return question.choiceExplanations[index];
  }
  if (index === question.correct) {
    return question.explanation || "This option matches the evidence and reasoning requested by the prompt.";
  }
  return "This option does not fully match the evidence, condition, or reasoning required by the prompt.";
}

function applyMcqSubjectChrome() {
  const format = selectedPracticeSubject.format;
  const weight = practiceData?.formatWeight?.(format.mcqWeight) || format.mcqWeight + "%";
  const topbarTitle = document.querySelector(".topbar h1");
  const topbarMeta = document.querySelector(".topbar .brand-block p");
  const examNote = document.getElementById("examNote");
  const structureValues = document.querySelectorAll(".structure-panel dd");
  const sourceNote = document.querySelector(".source-note");

  document.title = "AP Exam Practice | " + selectedPracticeSubject.title + " MCQ";
  if (topbarTitle) topbarTitle.textContent = selectedPracticeSubject.short + " MCQ";
  if (topbarMeta) topbarMeta.textContent = questions.length + " questions · " + Math.round(TOTAL_SECONDS / 60) + " minutes · " + weight;
  if (examNote) {
    examNote.innerHTML = "<strong>Section I:</strong> " + questions.length + " MCQ · " + Math.round(TOTAL_SECONDS / 60) + " min · " + weight + "." + (UNIT_FOCUS ? " Focus: " + escapeHtml(UNIT_FOCUS) + "." : "");
  }
  if (structureValues[1]) structureValues[1].textContent = String(questions.length);
  if (structureValues[2]) structureValues[2].textContent = Math.round(TOTAL_SECONDS / 60) + " minutes";
  if (structureValues[3]) structureValues[3].textContent = weight;
  if (structureValues[4]) {
    const maxChoices = Math.max(...questions.map((question) => question.choices.length));
    structureValues[4].textContent = "A-" + String.fromCharCode(64 + maxChoices);
  }
  if (sourceNote) sourceNote.textContent = UNIT_FOCUS
    ? "Unit practice focus: " + UNIT_FOCUS + ". Auto graded after submit."
    : "Practice made by Alan. Auto graded after submit; no penalty for guessing.";
}

function currentQuestion() {
  return questions[state.current];
}

function render() {
  const q = currentQuestion();
  const answeredCount = state.answers.filter((answer) => answer !== null).length;
  const score = calculateScore();

  els.timer.textContent = formatTime(state.remaining);
  els.progressText.textContent = `${answeredCount} / ${questions.length}`;
  if (els.mcqProgressBar) {
    els.mcqProgressBar.style.width = `${(answeredCount / questions.length) * 100}%`;
  }
  els.answeredText.textContent = `${answeredCount} answered`;
  els.scoreText.textContent = state.submitted ? `${score} / ${questions.length}` : "--";
  els.questionNumber.textContent = `Question ${state.current + 1} of ${questions.length}`;
  els.setLabel.hidden = true;
  els.setLabel.textContent = "";
  els.questionText.textContent = questionPrompt(q);
  els.stimulus.hidden = true;
  els.stimulus.innerHTML = "";

  els.choices.innerHTML = "";
  q.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice";
    button.disabled = state.submitted;
    button.setAttribute("aria-pressed", state.answers[state.current] === index ? "true" : "false");
    if (state.answers[state.current] === index) button.classList.add("selected");
    if (state.submitted && index === q.correct) button.classList.add("correct");
    if (state.submitted && state.answers[state.current] === index && index !== q.correct) {
      button.classList.add("incorrect");
    }
    button.innerHTML = `
      <span class="choice-letter">${String.fromCharCode(65 + index)}</span>
      <span class="choice-text">${escapeHtml(choice)}${state.submitted ? `<em class="choice-explanation">${escapeHtml(answerChoiceExplanation(q, index))}</em>` : ""}</span>
    `;
    button.addEventListener("click", () => selectAnswer(index));
    els.choices.appendChild(button);
  });

  els.prevBtn.disabled = state.current === 0;
  els.nextBtn.disabled = state.current === questions.length - 1;
  els.flagBtn.textContent = state.flagged[state.current] ? "Unflag" : "Flag";
  if (els.guessBtn) {
    els.guessBtn.textContent = state.guessed[state.current] ? "Not Guess" : "Guess";
    els.guessBtn.setAttribute("aria-pressed", String(Boolean(state.guessed[state.current])));
  }
  els.startBtn.textContent = state.submitted ? "Review Done" : state.started ? "Pause Timer" : "Start Timer";
  els.startBtn.disabled = state.submitted;
  els.submitBtn.disabled = state.submitted;

  document.body.classList.toggle("is-paused", !state.started && !state.submitted && state.remaining < TOTAL_SECONDS);

  renderNavigator();
  renderReview();
  renderBlueprint();
  saveState();
}

function renderNavigator() {
  els.navigator.innerHTML = "";
  questions.forEach((q, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "nav-dot";
    button.textContent = index + 1;
    button.setAttribute("aria-label", `Go to question ${index + 1}`);
    if (index === state.current) button.classList.add("current");
    if (state.answers[index] !== null) button.classList.add("answered");
    if (state.flagged[index]) button.classList.add("flagged");
    if (state.guessed[index]) button.classList.add("guessed");
    if (state.submitted && state.answers[index] === q.correct) button.classList.add("right");
    if (state.submitted && state.answers[index] !== null && state.answers[index] !== q.correct) {
      button.classList.add("wrong");
    }
    button.addEventListener("click", () => {
      state.current = index;
      render();
    });
    els.navigator.appendChild(button);
  });
}

function renderReview() {
  if (!state.submitted) {
    els.reviewPanel.hidden = true;
    if (els.reviewList) els.reviewList.innerHTML = "";
    return;
  }

  const q = currentQuestion();
  const selected = state.answers[state.current];
  const isCorrect = selected === q.correct;
  const selectedLabel = selected === null ? "No answer" : String.fromCharCode(65 + selected);
  const correctLabel = String.fromCharCode(65 + q.correct);

  els.reviewPanel.hidden = false;
  els.reviewStatus.textContent = isCorrect ? "Correct" : "Review";
  els.reviewStatus.style.color = isCorrect ? "var(--green)" : "var(--red)";
  els.reviewTitle.textContent = `Correct answer: ${correctLabel}. Your answer: ${selectedLabel}.`;
  els.reviewExplanation.textContent = q.explanation;
  els.reviewTags.innerHTML = `
    <span class="tag">${escapeHtml(q.unit)}</span>
    <span class="tag">${escapeHtml(skillLabels[q.skill])}</span>
  `;
  renderReviewList();
}

function reviewFilterMatches(question, index, filter) {
  if (filter === "missed") return state.answers[index] !== question.correct;
  if (filter === "flagged") return Boolean(state.flagged[index]);
  if (filter === "guessed") return Boolean(state.guessed[index]);
  if (filter === "unit") return question.unit === currentQuestion().unit;
  return true;
}

function renderReviewList() {
  if (!els.reviewList) return;
  const filter = els.reviewFilter?.value || "all";
  const rows = questions
    .map((question, index) => ({ question, index }))
    .filter(({ question, index }) => reviewFilterMatches(question, index, filter));

  els.reviewList.innerHTML = rows.length
    ? rows.map(({ question, index }) => {
        const selected = state.answers[index];
        const correct = selected === question.correct;
        const status = correct ? "Correct" : selected === null ? "Blank" : "Missed";
        return `
          <button class="review-list-item${index === state.current ? " is-current" : ""}" type="button" data-review-index="${index}">
            <span>Q${index + 1}</span>
            <strong>${status}</strong>
            <em>${escapeHtml(question.unit.replace(/^Unit\s+\d+:\s*/, ""))}</em>
          </button>
        `;
      }).join("")
    : '<p class="empty-copy">No questions match this review filter.</p>';

  els.reviewList.querySelectorAll("[data-review-index]").forEach((button) => {
    button.addEventListener("click", () => {
      state.current = Number(button.dataset.reviewIndex);
      render();
      document.querySelector(".question-card")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function renderBlueprint() {
  if (els.blueprintList.dataset.rendered === "true") return;

  const counts = questions.reduce((acc, question) => {
    const match = question.unit.match(/^Unit \d+/);
    const unitKey = match ? match[0] : question.unit;
    acc[unitKey] = (acc[unitKey] || 0) + 1;
    return acc;
  }, {});

  const rows = selectedPracticeSubject.title === "AP Statistics"
    ? Object.entries(officialUnitRanges).map(([unit, range]) => ({
        label: unit + " <em>(" + range + ")</em>",
        count: counts[unit] || 0
      }))
    : selectedPracticeSubject.units.map((unit, index) => ({
        label: "Unit " + (index + 1) + " <em>(practice mix)</em>",
        count: counts["Unit " + (index + 1)] || 0
      }));

  const html = rows.map((row) => {
    const percent = Math.round((row.count / questions.length) * 1000) / 10;
    return "<div class=\"blueprint-row\"><span>" + row.label + "</span><strong>" + row.count + " q / " + percent + "%</strong><div class=\"bar\" aria-hidden=\"true\"><span style=\"width: " + percent + "%\"></span></div></div>";
  }).join("");

  els.blueprintList.innerHTML = html;
  els.blueprintList.dataset.rendered = "true";
}

function selectAnswer(index) {
  if (state.submitted) return;
  state.answers[state.current] = index;
  if (!state.started && state.remaining === TOTAL_SECONDS) {
    startTimer();
  }
  render();
}

function calculateScore() {
  return questions.reduce((score, q, index) => score + (state.answers[index] === q.correct ? 1 : 0), 0);
}

function weakestUnits() {
  const unitRows = questions.reduce((acc, question, index) => {
    const key = question.unit;
    if (!acc[key]) acc[key] = { correct: 0, total: 0 };
    acc[key].total += 1;
    if (state.answers[index] === question.correct) acc[key].correct += 1;
    return acc;
  }, {});

  return Object.entries(unitRows)
    .map(([unit, row]) => ({ unit, rate: row.total ? row.correct / row.total : 0 }))
    .sort((first, second) => first.rate - second.rate)
    .slice(0, 3)
    .map((item) => item.unit);
}

function recordMcqAttempt(auto = false) {
  const score = calculateScore();
  practiceData?.recordScoreAttempt?.({
    mode: "MCQ",
    subjectTitle: selectedPracticeSubject.title,
    subjectShort: selectedPracticeSubject.short,
    subjectSlug: selectedPracticeSubject.slug,
    unitFocus: UNIT_FOCUS || "All units",
    score,
    maxScore: questions.length,
    percent: questions.length ? (score / questions.length) * 100 : 0,
    timeUsedSeconds: TOTAL_SECONDS - state.remaining,
    flagged: state.flagged.filter(Boolean).length,
    guessed: state.guessed.filter(Boolean).length,
    autoSubmitted: Boolean(auto),
    weakUnits: weakestUnits()
  });
}

function startTimer() {
  if (state.submitted) return;
  state.started = true;
  state.lastTick = Date.now();
  runTimer();
}

function pauseTimer() {
  updateRemainingFromClock();
  state.started = false;
  state.lastTick = null;
  stopTimer();
}

function runTimer() {
  stopTimer();
  timerHandle = window.setInterval(() => {
    if (!state.started || state.submitted) return;
    updateRemainingFromClock();
    if (state.remaining <= 0) {
      state.remaining = 0;
      submitSection(true);
      return;
    }
    render();
  }, 1000);
}

function stopTimer() {
  if (timerHandle) {
    window.clearInterval(timerHandle);
    timerHandle = null;
  }
}

function updateRemainingFromClock() {
  if (!state.started || !state.lastTick) return;
  const now = Date.now();
  const elapsed = Math.floor((now - state.lastTick) / 1000);
  if (elapsed > 0) {
    state.remaining = Math.max(0, state.remaining - elapsed);
    state.lastTick = now;
  }
}

function reconcileLoadedTimer() {
  if (!state.started || state.submitted) return;
  updateRemainingFromClock();
  if (state.remaining <= 0) {
    state.remaining = 0;
    state.started = false;
    state.score = calculateScore();
    state.submitted = true;
    state.lastTick = null;
    stopTimer();
  } else {
    state.lastTick = Date.now();
  }
}

function submitSection(auto = false) {
  if (state.submitted) return;
  const unanswered = state.answers.filter((answer) => answer === null).length;
  if (!auto && unanswered > 0) {
    const proceed = window.confirm(`You have ${unanswered} unanswered question${unanswered === 1 ? "" : "s"}. Submit anyway?`);
    if (!proceed) return;
  }
  updateRemainingFromClock();
  state.started = false;
  state.score = calculateScore();
  state.submitted = true;
  state.lastTick = null;
  stopTimer();
  recordMcqAttempt(auto);
  render();
}

function resetSection() {
  const proceed = window.confirm("Restart the section and clear all responses?");
  if (!proceed) return;
  state = defaultState();
  stopTimer();
  localStorage.removeItem(STORAGE_KEY);
  render();
}

els.prevBtn.addEventListener("click", () => {
  state.current = Math.max(0, state.current - 1);
  render();
});

els.nextBtn.addEventListener("click", () => {
  state.current = Math.min(questions.length - 1, state.current + 1);
  render();
});

els.flagBtn.addEventListener("click", () => {
  state.flagged[state.current] = !state.flagged[state.current];
  render();
});

if (els.guessBtn) {
  els.guessBtn.addEventListener("click", () => {
    state.guessed[state.current] = !state.guessed[state.current];
    render();
  });
}

els.clearBtn.addEventListener("click", () => {
  if (state.submitted) return;
  state.answers[state.current] = null;
  render();
});

els.startBtn.addEventListener("click", () => {
  if (state.started) {
    pauseTimer();
  } else {
    startTimer();
  }
  render();
});

els.submitBtn.addEventListener("click", () => submitSection(false));
els.resetBtn.addEventListener("click", resetSection);
els.reviewFilter?.addEventListener("change", renderReviewList);
els.printSummaryBtn?.addEventListener("click", () => window.print());

document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  const letterIndex = ["a", "b", "c", "d", "e"].indexOf(key);
  if (letterIndex >= 0 && !state.submitted) {
    selectAnswer(letterIndex);
  }
  if (key === "arrowright") {
    state.current = Math.min(questions.length - 1, state.current + 1);
    render();
  }
  if (key === "arrowleft") {
    state.current = Math.max(0, state.current - 1);
    render();
  }
});

reconcileLoadedTimer();

if (!state.submitted && !state.started) {
  startTimer();
} else if (state.started && !state.submitted) {
  runTimer();
}

applyMcqSubjectChrome();
render();
