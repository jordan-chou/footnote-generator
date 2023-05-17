const inputDefault = 
`
<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium<a href="#_ftn1" name="_ftnref1" title=""> </a>, totam rem aperiam<a href="#_ftn2" name="_ftnref2" title=""> </a>, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. <em>Nemo enim ipsam voluptatem quia</em> voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit<a href="#_ftn3" name="_ftnref3" title=""> </a>, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
	
	<div>
      <div id="ftn1">
        <p><a href="#_ftnref1" name="_ftn1" title=""> </a> Lorem ipsum dolor sit amet, <em>consectetur adipiscing elit</em>, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
      <div id="ftn2">
        <p><a href="#_ftnref2" name="_ftn2" title=""> </a> Ut enim ad minim veniam, <em>quis nostrud exercitation ullamco</em> laboris nisi ut aliquip ex ea commodo consequat.</p>
      </div>
      <div id="ftn3">
        <p><a href="#_ftnref3" name="_ftn3" title=""> </a> Duis aute irure dolor in reprehenderit in voluptate velit esse <em>cillum dolore eu fugiat nulla pariatur</em>.</p>
      </div>
    </div>
`.trim();

const inputDefault2 = 
`
<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium<a href="#_ftn1" name="_ftnref1" title=""> </a>, totam rem aperiam<a href="#_ftn2" name="_ftnref2" title=""> </a>, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. <em>Nemo enim ipsam voluptatem quia</em> voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit<a href="#_ftn3" name="_ftnref3" title=""> </a>, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
	
	<div>
      <div id="ftn1"><br>
        <a href="#_ftnref1" name="_ftn1" title=""> </a> Lorem ipsum dolor sit amet, <em>consectetur adipiscing elit</em>, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </div>
      <div id="ftn2">
        <p><a href="#_ftnref2" name="_ftn2" title=""> </a> Ut enim ad minim veniam, <em>quis nostrud exercitation ullamco</em> laboris nisi ut aliquip ex ea commodo consequat.</p>
      </div>
      <div id="ftn3">
        <p><a href="#_ftnref3" name="_ftn3" title=""> </a> Duis aute irure dolor in reprehenderit in voluptate velit esse <em>cillum dolore eu fugiat nulla pariatur</em>.</p>
      </div>
    </div>
`.trim();

/* EN and FR Strings */
const FN_BTN_EN = "English";
const FN_H2_EN  = "Footnotes";
const FN_DT_EN  = "Footnote";
const FN_SP1_EN = "Return to footnote ";
const FN_SP2_EN = " referrer";
const engStrings = [FN_BTN_EN, FN_H2_EN, FN_DT_EN, FN_SP1_EN, FN_SP2_EN]; 

const FN_BTN_FR = "Français";
const FN_H2_FR  = "Notes de bas de page";
const FN_DT_FR  = "Note de bas de page";
const FN_SP1_FR = "Retour à la référence de la note de bas de page ";
const frStrings = [FN_BTN_FR, FN_H2_FR, FN_DT_FR, FN_SP1_FR]; 


/*
Convert
  <a href="#_ftn1" name="_ftnref1" title=""> </a>
to
  <sup id="fn1-rf"><a class="fn-lnk" href="#fn1"><span class="wb-inv">Footnote </span>1</a></sup>

  
Convert
  <div id="ftn1">
    <p><a href="#_ftnref1" name="_ftn1" title=""> </a> Lorem ipsum dolor sit amet, <em>consectetur adipiscing elit</em>, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
  </div>
to
  <dt>Footnote 1</dt>
  <dd id="fn1">
    <p>Example of a standard footnote.</p>
    <p class="fn-rtn"><a href="#fn1-rf"><span class="wb-inv">Return to footnote </span>1<span class="wb-inv"> referrer</span></a></p>
  </dd>

Footnote Section example:
<aside class="wb-fnote" role="note">
	<h2 id="fn">Footnotes</h2>
	<dl>
		<dt>Footnote 1</dt>
		<dd id="fn1">
			<p>Example of a standard footnote.</p>
			<p class="fn-rtn"><a href="#fn1-rf"><span class="wb-inv">Return to footnote </span>1<span class="wb-inv"> referrer</span></a></p>
		</dd>
		<dt>Footnote 2</dt>
		<dd id="fn2">
			<p>Example of a footnote being referenced by multiple pieces of content.</p>
			<p class="fn-rtn"><a href="#fn2-1-rf"><span class="wb-inv">Return to <span>first</span> footnote </span>2<span class="wb-inv"> referrer</span></a></p>
		</dd>
		<dt>Footnote 3</dt>
		<dd id="fn3">
			<p>Example of a footnote containing multiple paragraphs (first paragraph).</p>
			<p>Example of a footnote containing multiple paragraphs (second paragraph).</p>
			<p>Example of a footnote containing multiple paragraphs (third paragraph).</p>
			<p class="fn-rtn"><a href="#fn3-rf"><span class="wb-inv">Return to footnote </span>3<span class="wb-inv"> referrer</span></a></p>
		</dd>
		<dt>Footnote 4</dt>
		<dd id="fn4">
			<p>Example of a footnote where first time clicked the user will get redirected to it's first instance of the footnote even if the coded link say otherwise. Prevent undesirable behaviour when footnote are added during a content review process.</p>
			<p class="fn-rtn"><a href="#fn4-1-rf"><span class="wb-inv">Return to <span>first</span> footnote </span>4<span class="wb-inv"> referrer</span></a></p>
		</dd>
		<dt>Footnote *</dt>
		<dd id="fn*">
			<p>Example of a standard footnote, denoted by a symbol.</p>
			<p class="fn-rtn"><a href="#fn*-rf"><span class="wb-inv">Return to footnote </span>*<span class="wb-inv"> referrer</span></a></p>
		</dd>
	</dl>
</aside>
*/